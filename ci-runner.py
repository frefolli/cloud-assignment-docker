#!/usr/bin/env python3
import yaml
import sys

class YamlFile:
    @staticmethod
    def run(path: str) -> dict:
        return YamlFile._parse_file(YamlFile._read_file(path))
    
    @staticmethod
    def _read_file(path: str):
        with open(path, mode = "r", encoding = "utf-8") as file:
            return file.read()

    @staticmethod
    def _parse_file(text: str):
        return yaml.load(text, Loader=yaml.Loader)

class Pipeline:
    def __init__(self):
        data = YamlFile.run(".gitlab-ci.yml")
        self._jobs = list(data.keys())[5:]

    def validate_job(self, name: str) -> str:
        assert name in self._jobs
        return name

    def validate_execution(self, jobs: str) -> list[str]:
        return [self.validate_job(job) for job in jobs]

class Execution:
    def __init__(self, name: str, jobs: list[str]):
        self._name = name
        self._jobs = jobs

    def run(self):
        for job in self._jobs:
            self._launch_job(job)

    def _launch_job(self, job: str):
        self._cmd("gitlab-runner exec docker %s --docker-pull-policy if-not-present" % job)

    def _cmd(self, line: str):
        print(line)

class Presets:
    def __init__(self, path: str):
        self._presets = {}
        pipeline = Pipeline()
        data = YamlFile.run(path)
        for label in data:
            self._presets[label] = Execution(label, pipeline.validate_execution(data[label]))

    def get_names(self) -> list[str]:
        return self._presets.keys()

    def run(self, name: str):
        assert name in self._presets
        self._presets[name].run()

if __name__ == "__main__":
    presets = Presets("ci-presets.yml")
    args = sys.argv[1:]
    if len(args) > 0:
        presets.run(args[0])
    else:
        print("choose a preset: {%s}" % " | ".join(presets.get_names()))
