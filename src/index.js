import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./assets/style.css";
import Questions from './questionBank/questionService';
import QuestionBox from './components/questionBox/questionBox';

class Quiz extends Component {
  state = {
    questionBank: [] ,
    score: 0,
    responses: 0
  };

  getQuestions = () => {
    Questions().then(question => {
      this.setState({
        questionBank: question
      });
    });
  };

  computeAnswer = (answer, correctAnswer) => {
    if(answer === correctAnswer) {
      this.setState({
        score: this.state.score +1
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    });

  }

  componentDidMount() {
    this.getQuestions();
  }

  render(){
    return (
      <div className='container'>
        <div className='title'><h1>Quiz</h1></div>
    {this.state.questionBank.length > 0 && 
    this.state.responses < 5 &&
    this.state.questionBank.map(({question, answers, correct, questionId}) => (
    <QuestionBox 
    question={question} 
    options={answers} 
    key={questionId}
    selected={answer => this.computeAnswer(answer, correct)}
    />))}
      </div>
    )
  }
}

ReactDOM.render(<Quiz/>, document.getElementById('root'));