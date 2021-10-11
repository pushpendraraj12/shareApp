import React, { Component } from 'react';
import axios from 'axios';
export default class Download extends Component{ 
    constructor(props){
        super(props);    
        this.download=this.download.bind(this)         
        this.state={                        
            file:'', 
            size:0 , 
            mess:'', 
            link:'',       
            errorMessage:'',
            percent:0,
            id:props.match.params.id,
        }    
    }
componentDidMount(){
    const url="/api/show/"+this.state.id;
    axios.get(url)
    .then(suc=>{
        this.setState({file:suc.data[0],size:suc.data[1],link:suc.data[2]});
    })
    .catch(err=>{
        this.setState({errorMessage:"error occured"})
    })
}
download(){
const url=this.state.link;
axios.get(url)
 .then(suc=>{
        this.setState({mess:"Downloading Started"});    
         window.location.replace(url)  
    })
    .catch(err=>{
        this.setState({errorMessage:"Link expired"})
        this.setState({mess:""})
    })
}
render(){
  return (
    <div>
        <div className="container-fluid">
	<div className="row">
		<div id="ms-container">         
			<label for="ms-download">
				<div class="ms-content">
                     
					<div className="ms-content-inside">
                       
						<input type="checkbox" id="ms-download" onClick={()=>this.download()}/>  
                                          
						<div className="ms-line-down-container">
							<div className="ms-line-down"></div>
						</div>
						<div className="ms-line-point"></div>
					</div>                    
				</div>
			</label>            
		</div>
	</div>
</div>                      
    </div>
  );
}
}