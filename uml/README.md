# Design & Architectural Patterns

## Endpoint

[Page Controller](https://martinfowler.com/eaaCatalog/pageController.html)

Le classi Endpoint rappresentano una divisione in pagine dell'API, quindi sono un'applicazione dell'architectural pattern Page Controller.

## Repository

[Singleton](https://refactoring.guru/design-patterns/singleton)
[Table Data Gateway](https://martinfowler.com/eaaCatalog/tableDataGateway.html)

Tutte le interfacce QualcosaRepository hanno associato rispettivamente una classe utility nominata `QualcosaRepositoryGateway`, una classe che usa il pattern singleton per avere solo una istanza dei repository jdbc.
Tutte le interfacce implementano l'architectural pattern Table Data Gateway, in quanto rappresentano un'interfaccia unificata e fruibile per ottenere informazioni dalla tabella di database che puo' essere remoto o locale.

## Controller

[Singleton](https://refactoring.guru/design-patterns/singleton)

Tutti i controller (tranne ControllerResetController) implementano il design pattern Singleton, quindi hanno tutti rispettivamente l'istanza statica `instance`, il metodo statico `createInstance` che assegna ad ogni controller la sua istanza statica (creata e coordinata da ControllerResetController) e il metodo `getInstance`.

## Chain of Responsibility

[Chain of Responsibility](https://refactoring.guru/design-patterns/chain-of-responsibility)
[Singleton](https://refactoring.guru/design-patterns/singleton)

Le classi Validator e ValidatorHandler (e derivate) implementano il design pattern Chain of Responsibility, in quanto la validazione dei campi e' delegata a catene di ValidatorHandler che eseguono controlli ed eventualmente lanciano una eccezione ValidationException.
Le classi Validator usano anche il design pattern Singleton.

## IDGeneration e IDGenerationFacade

[Strategy](https://refactoring.guru/design-patterns/strategy)
[Template Method](https://refactoring.guru/design-patterns/template-method)
[Facade](https://refactoring.guru/design-patterns/facade)
[Singleton](https://refactoring.guru/design-patterns/singleton)

Le classi IDGenerator e derivati implementano i pattern Strategy e Template Method, perche' IDGenerator definisce la successione delle fasi preprocess -> compute -> postprocess, le quali sono modificabili singolarmente dalle derivate e perche' le derivate applicano potenzialmente algoritmi diverse per ottenere lo stesso risultato.
La classe IDGenerationFacade e' applicazione dei design pattern Singleton e Facade.