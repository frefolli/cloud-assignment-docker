import React from 'react';
import { FAKE_NOTIFIER, ADVICE_VIEW_TRIGGER, ADVICE_VIEW_ESCAPE, NEXT_RECIPE_VIEW_TRIGGER } from '../utils/Protocol';
import AdviceManager from '../utils/AdviceManager';
import RecipeView from './RecipeView';
import RecipeExecute from './RecipeExecute';

/**
 * This component is responsible for displaying advice on what beer to brew next based on your ingredients.
 * 
 * @class AdviceView
 * 
 * @param {Object} props - The component's properties.
 * @param {Notifier} props.notifier - An optional notifier for displaying notifications (default: FAKE_NOTIFIER).
 * @param {boolean} props.testAdviceCookie - Set to true to test the advice cookie.
 * @param {function} props.masterCall - A function to be called after triggering the next recipe view.
 *
 * @example
 * // Example usage of the AdviceView component
 * <AdviceView
 *   notifier={customNotifier}
 *   testAdviceCookie={true}
 *   masterCall={handleMasterCall}
 * />
 *
 * @return {JSX.Element} The AdviceView component for displaying brewing advice.
 */

export default class AdviceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advice: null,
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.adviceManager = new AdviceManager();
  }

  triggerReload = () => {
    return new Promise((acc, rej) => {
      this.setState(({advice: null}), () => {
        this.adviceManager.getAdvice()
        .then((data) => this.setState({ advice: data}))
        .catch(() => this.setState({ advice: null }))
        .then(acc);
      })
    })
  }

  componentDidMount() {
    if (this.props.testAdviceCookie) {
        document.cookie = ADVICE_VIEW_TRIGGER;
    }
    this.triggerReload();
  }

  confirmAndTriggerNextRecipeView = () => {
    this.triggerReload()
    .then(() => document.cookie = NEXT_RECIPE_VIEW_TRIGGER)
    .then(this.props.masterCall)
  }

  render() {
    if (document.cookie.includes(ADVICE_VIEW_TRIGGER)) {
      document.cookie = ADVICE_VIEW_ESCAPE;
      this.triggerReload();
    }

    return (
      <div>
        <h1 className="advice-texts">Vuoi un consiglio?</h1>
        {this.state.advice === null ? (
          <div>
            <h2 className="advice-texts">Prova ad inserire qualche ricetta</h2>
            <h2 className="advice-texts">o a inventariare qualche ingrediente</h2>
          </div>
        ) : (
          <div>
            <h2 className="advice-texts">
              Ecco quale birra dovresti preparare
            </h2>
            <RecipeView
              notifier={this.notifier}
              recipeID={this.state.advice.recipeID}/>
            <RecipeExecute
              beerQuantity={Math.max(0, Number(this.state.advice.quantity))}
              notifier={this.notifier}
              recipeID={this.state.advice.recipeID}
              onConfirm={this.confirmAndTriggerNextRecipeView}
            />
            <h3 className="advice-texts">
              La massima quantità realizzabile è {" "}
              {this.state.advice.quantity === -1 ? "infinita" : this.state.advice.quantity}
            </h3>
          </div>
        )}
      </div>
    );
  }
}
