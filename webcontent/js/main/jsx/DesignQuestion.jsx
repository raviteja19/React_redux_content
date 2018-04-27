import React from 'react';
import  $ from 'jquery';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '../actions/actions';
export class DesignQuestion extends React.Component
{
    constructor(props)
	{
		super(props);
		this.state={typed:''};
		this.QuestionOption=this.QuestionOption.bind(this);
		
		
	}

	QuestionOption(option,i)
	{var value=option;
		
		return (
			<div key={i} className="options">
				<input id={i+'-'+this.props.id}  type="text" className="input_options"  onChange={this.props.changeOptions}/>
			</div>
			);
	}

	componentDidMount()
	{
		this.props.actions.checkExistence(data);
	}

	render()
	{

	var me=this,display;
	
		if(this.props.defaultquestionNo==this.props.id)
		{
			display='block';
		}
		else
		{
			display='none';
		}
	    return (
		<div className="question_design" style={{display:display}}>
			<div className="header">
				<label>Write a Quesstion</label>
			</div>
			<div className="question_input">
				<input id={me.props.id} type="text" className="input" onChange={this.props.writeQuestion}/>
			</div>
			<div className="question_image">
				<div className="row">
					<div className="col-sm-4 col-md-4 col-lg-4 col-sm-4">
						<input type="file" id={me.props.id} className="input" onChange={this.props.changeFile}/>
					</div>
					<div className="col-sm-8 col-md-8 col-lg-8 col-sm-8">
					<div style={ { display: this.props.info.filepath==0 ? 'none' : 'block' } }>You have selected</div>
					{this.props.info.filepath.map(function(images,i)
						{
							return (<span key={i} className="filename">{images}</span>);
						})
					}
					</div>
				</div>
			</div>
			<div className="question_option">
				<div className="header">
					<label>Give Options</label>
				</div>
				{me.props.options.map(me.QuestionOption)}
			</div>
			<div className="add_delete">
				<div className="row">
					<div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
						<div className="Add">
							<button id={me.props.id} type="button" className="btn btn-success" onClick={this.props.addOption}>ADD</button>
						</div>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
						<div className="Delete">
							<button id={me.props.id} type="button" className="btn btn-success" onClick={this.props.deleteOption}>Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>
         
	    );
	}
}
DesignQuestion.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(DesignQuestion);