import React  from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import  $ from 'jquery';
import DesignQuestion from './DesignQuestion.jsx';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '../actions/actions';
class App extends React.Component {
    constructor(props,context) {
        super(props,context);
       this.state={moreOptions:false,defaultquestionNo:0,quizQuestion:[],quiz:{question:'',options:['option1','options2']}};
       this.addQuestion=this.addQuestion.bind(this);
	   this.deleteQuestion=this.deleteQuestion.bind(this);
	   this.writeQuestion=this.writeQuestion.bind(this);
	   this.addOption=this.addOption.bind(this);
	   this.designQuestion=this.designQuestion.bind(this);
	   this.deleteOption=this.deleteOption.bind(this);
	   this.changeOptions=this.changeOptions.bind(this);
	   this.Questions=this.Questions.bind(this);
	   this.setQuestionNo=this.setQuestionNo.bind(this);
	   this.dismissAlert=this.dismissAlert.bind(this);
	   this.viewPaper=this.viewPaper.bind(this);
	   this.changeFile=this.changeFile.bind(this);
      }
    
    componentDidMount()
    {
        var me=this;
		var a={b:'teja',c:'thota'};
		var c={e:'trt',f:'thota'};
		console.log(a==c);
		console.log(a===c);

    }

    componentDidMount()
    {	var height=window.innerHeight-90;
		var height1=window.innerHeight-50;
		$('#questions_dashboard').css({height:height});
		$('#questions').css({height:height});		
		$('#home-page').css({height:height1});
		$(document).ready(function(){
			                 $("#getQuiz").css('display','none');
				 $("#setQuiz").css('display', 'block');
			$(window).resize(function(){
							var heights=window.innerHeight-90;
							var height1=window.innerHeight-50;
				$('#questions_dashboard').css({height:heights});
				
				$('#questions').css({height:heights});
				$('#home-page').css({height:height1});
			});
			$("#setPaper").click(function(){
                 $("#getQuiz").css('display','none');
				 $("#setQuiz").css('display', 'block');
             });
             $("#questionPaper").click(function(){
				 var height1=window.innerHeight-90;
                    $("#setQuiz").css({'display':'none'});
					$("#getQuiz").css('display', 'block');
					$("#viewPaper").css({height:height1});
             });
		});
    }
    addQuestion(e)
	{
		e.preventDefault();var reduxQuestion=['teja','ravi'];
		var me=this,finals=me.state.quizQuestion,questionNo=me.state.quizQuestion.length;
		var quiz={question:'New Question',options:['option1','options2'],filepath:[]};
		var question='New Question',option=[];
		question=question+1;
		finals.push(quiz);
		this.setState({quizQuestion:finals,defaultquestionNo:questionNo});
		this.props.actions.addQuestion(reduxQuestion);
	}
	deleteQuestion(e)
	{
		e.preventDefault();
		var me=this,quizJson=me.state.quizQuestion,len=me.state.quizQuestion.length;
		if(len>0){
		quizJson.pop();
		this.setState({quizQuestion:quizJson});
		}
		
	}
	designQuestion(info,i)
	{var me=this;
	
		return (<DesignQuestion key={i} info={info} id={i} defaultquestionNo={this.state.defaultquestionNo} changeFile={this.changeFile} addOption={this.addOption} deleteOption={this.deleteOption} changeOptions={this.changeOptions} writeQuestion={this.writeQuestion} options={info.options}/>);	
	}
	Questions(data,i)
	{
			const tooltip = (
			<Tooltip id="tooltip">
			<strong>Click here</strong> to design question {i+1}.
			</Tooltip>
);
			
			return (
				<div className="question_no" key={i}>
					<OverlayTrigger placement="top" overlay={tooltip}>
					<label id={i} className="questions_no" onClick={this.setQuestionNo}>{i+1+'. '}{data.question}</label>
					</OverlayTrigger>
				</div>
			);
	}
	viewPaper(data,i)
	{
		return (
			<div key={i} className="questions">
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div className="questionName">
						{i+1} {data.question} 
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
							<div className="options">
							{data.options.map(function(option,i)
							{
								return (
									<div className="radio" key={i}>
									<label><input type="radio" name="optradio"/>{option}</label>
									</div>
										);
							})}
							</div>
						</div>
						<div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
							<div className="images">
							{data.filepath.map(function(filepath,i)
								{
							return (<img key={i} id="blah" className="image" src={'images/'+filepath} alt="your image" />);
								})
							}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	setQuestionNo(e)
	{
		e.preventDefault();
		var id=e.target.id;
		this.setState({defaultquestionNo:id});
	}
	writeQuestion(e)
	{
		e.preventDefault();
		var id=e.target.id,quizJson={},options=[];
		quizJson=this.state.quizQuestion;
		quizJson[id].question=e.target.value;
		this.setState({quizQuestion:quizJson});
	}
	addOption(e)
	{	
		e.preventDefault();
		var id=e.target.id,quizJson={},options=[],defaultAnswers,len;
		quizJson=this.state.quizQuestion;
		options=quizJson[id].options;
		len=options.length;
		if(len<6)
		{
		defaultAnswers='option'+(options.length+1);
		quizJson[id].options.push(defaultAnswers);
		this.setState({quizQuestion:quizJson,moreOptions:false});
		}
		else
		{
			this.setState({moreOptions:true});
		}

		
	}
	deleteOption(e)
	{
		e.preventDefault();
		var id=e.target.id,quizJson={},options=[],len;
		quizJson=this.state.quizQuestion;
		options=quizJson[id].options;
		len=options.length;
		if(len>2){
		quizJson[id].options.pop();
		this.setState({quizQuestion:quizJson});
		}else
		{
			this.setState({moreOptions:true});
		}
	}
	changeOptions(e)
	{
		e.preventDefault();
		var id=e.target.id;
		var a=id.split('-');
		var optionId=a[0],questionId=a[1],quizJson={},options=[],value=e.target.value;
		quizJson=this.state.quizQuestion;
		quizJson[questionId].options[optionId]=value;
		
		this.setState({quizQuestion:quizJson});
		
		
	}
	changeFile(e)
	{
		e.preventDefault();
		var filename=e.target.value;
		var me=this,finals=me.state.quizQuestion;
		finals[e.target.id].filepath.push(e.target.files[0].name);
		this.setState({quizQuestion:finals});
		
	}
	dismissAlert(e)
	{
			e.preventDefault();
			this.setState({moreOptions:false});
	}

   render() {
var me=this;
console.log(this.props.questions);	
         return (
<div className="container-fluid">
   <div id="home-page" className="home-page">
		<div className="main">
			<div className="tags">
				<div className="row">
					<ul className="nav navbar-nav">
						  <li className="active"><a href="#">Home</a></li>
						  <li><a href="#" id="setPaper">Set Quiz Question Paper</a></li>
						  <li><a href="#" id="questionPaper">View Quiz</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div className="row">
			<div className="col-sm-12 col-xs-12 col-lg-12 col-md-12" id="setQuiz">
				<div className="setQuiz">
					<div className="row">
						<div className="col-sm-12 col-md-5 col-lg-5 col-xs-12">
							<div id="questions_dashboard" className="questions_dashboard">
								<div className="header">
									<label className="head">Select Questions</label>
								</div>
								<div className="select_question">
									<div className="questions">
										{this.state.quizQuestion.map(me.Questions)}
									</div>
									<div className="row">
										<div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
										<div className="Add">
											<button type="button" className="btn btn-success" onClick={me.addQuestion}>ADD</button>
										</div>
										</div>
										<div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
										<div className="Delete">
											<button type="button" className="btn btn-success" onClick={me.deleteQuestion}>Delete</button>
										</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-12 col-md-7 col-lg-7 col-xs-12">
							<div id="questions" className="design_questions">
								<div className="alert alert-warning alert-dismissable" style={ { display: this.state.moreOptions ? 'block' : 'none' } }  >
								<div href="#" className="close" data-dismiss="alert" aria-label="close" onClick={this.dismissAlert}>×</div>
								<strong>Warning!</strong> There should be atleast 2 or Maximum 6 options for a question.
								</div>
								<div className="header">
									<label className="head">Design Question</label>
								</div>
								<div className="Design_question">
									{me.state.quizQuestion.map(me.designQuestion)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-sm-12 col-xs-12 col-lg-12 col-md-12" id="getQuiz">
				<div className="getQuiz">
					<div className="viewPaper" id="viewPaper">
					<label className="header">Quiz Paper</label>
					<label className="header2" style={ { display: this.state.quizQuestion==0 ? 'block' : 'none' }}>First set question paper to view quiz</label>
					{this.state.quizQuestion.map(this.viewPaper)}
					</div>
				</div>
			</div>
		</div>
    </div>
</div>
      );
   }
}

App.propTypes = {
	actions: PropTypes.object.isRequired,
	questions: PropTypes.array.isRequired,
	options:PropTypes.array.isRequired
  };
  
  function mapStateToProps(state, ownProps) {
	return {
	  questions: state.questions,
	  options:state.options
	};
  }
  
  function mapDispatchToProps(dispatch) {
	return {
	  actions: bindActionCreators(allActions, dispatch)
	};
  }
export default connect(mapStateToProps, mapDispatchToProps)(App);