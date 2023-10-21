import React, {Component} from 'react';
import NextRecipeView from '../components/NextRecipeView';
import BodyThemeManager from '../components/BodyThemeManager';
import ContentCard from '../components/ContentCard';
import AdviceView from '../components/AdviceView';
import Greeter from '../components/Greeter';
import JimFlex from '../components/JimFlex';
import {FAKE_NOTIFIER} from '../utils/Protocol';

class Home extends Component {
  static propTypes = {
    notifier: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
  }

  render() {
    const adviceView = (
      <AdviceView
        notifier={this.notifier}
        masterCall={() => this.setState({})}
      />
    );

    const nextRecipeView = (
      <NextRecipeView
        notifier={this.notifier}
        masterCall={() => this.setState({})}
      />
    );

    const greeter = (
      <Greeter
        notifier={this.notifier}
      />
    );

    return (
      <BodyThemeManager>
        {greeter}
        <JimFlex>
          <ContentCard>{adviceView}</ContentCard>
          <ContentCard>{nextRecipeView}</ContentCard>
        </JimFlex>
      </BodyThemeManager>
    );
  }
}

export default Home;
