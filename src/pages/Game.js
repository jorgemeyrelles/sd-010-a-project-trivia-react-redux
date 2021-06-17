import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import { calculateScore, fetchAPIThunk, timeOut, timeIn } from '../actions/index';
import Timer from '../components/Timer';
import RenderQuestions from '../components/RenderQuestions';
import { getItemFromLocalStorage, setToLocalStorage } from '../services/storage';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      changedQuestion: false,
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.resetChangedQuestion = this.resetChangedQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  nextQuestion() {
    const { timerIn } = this.props;
    this.setState(({ questionNumber }) => ({
      questionNumber: questionNumber + 1,
      changedQuestion: true,
    }));
    timerIn();
  }

  resetChangedQuestion() {
    this.setState({ changedQuestion: false });
  }

  checkAnswer(event, questionLevel) {
    const { addScore, timesUp } = this.props;
    const DEFAULT_POINTS = 10;
    const getTime = Number(document.getElementById('timer').innerHTML);
    const attribute = event.target.getAttribute('data-testid');
    const state = getItemFromLocalStorage('state');
    if (attribute !== 'correct-answer') return timesUp();
    const points = DEFAULT_POINTS + (getTime * questionLevel);
    state.player.score = points;
    setToLocalStorage('state', state);
    timesUp();
    return addScore(points);
  }

  render() {
    const { isLoading, questionAnswered } = this.props;
    const { questionNumber, changedQuestion } = this.state;
    if (isLoading) return <h2>Loading...</h2>;
    return (
      <div>
        <Header />
        <span>
          Tempo:
          <Timer
            changedQuestion={ changedQuestion }
            resetChangedQuestion={ this.resetChangedQuestion }
          />
          segundos
        </span>
        <RenderQuestions
          checkAnswer={ this.checkAnswer }
          question={ questionNumber }
        />
        {questionAnswered
          ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              PRÓXIMA
            </button>) : ''}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAPIThunk()),
  timesUp: () => dispatch(timeOut()),
  addScore: (score) => dispatch(calculateScore(score)),
  timerIn: () => dispatch(timeIn()),
});

const mapStateToProps = ({ apiResponse: { isLoading }, player }) => ({
  isLoading,
  questionAnswered: player.timeOut,
});

Game.propTypes = {
  fetchAPI: Proptypes.func,
  isLoading: Proptypes.bool,
  timesUp: Proptypes.func,
  addScore: Proptypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
