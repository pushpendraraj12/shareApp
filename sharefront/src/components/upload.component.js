import React, { Component } from 'react';
import axios from 'axios';
import {ProgressBar} from 'react-bootstrap';
export default class Upload extends Component{
    constructor(props){
        super(props);      
        this.onSubmit=this.onSubmit.bind(this);   
         this.onSubmit2=this.onSubmit2.bind(this); 
         this.onchangesender=this.onchangesender.bind(this); 
         this.onchangerec=this.onchangerec.bind(this); 
        this.onclick=this.onclick.bind(this);
        this.handleFileUpload=this.handleFileUpload.bind(this);    
        this.state={            
            data:[],
            file:'',   
            fl:'',
            mess:'',        
            errorMessage:'',
            percent:0,
            send:'',
            rec:'',
        }
    }
onchangesender(e){
  this.setState({send:e.target.value})
}
onchangerec(e){
  this.setState({rec:e.target.value})
}
handleFileUpload(e){
    const file = e.target.files[0];
    this.setState({file:file});
  }
onclick(e){
  navigator.clipboard.writeText(this.state.data.url);
  
  alert("Copied the text: " + this.state.data.url);
}
onSubmit(e){
 e.preventDefault();
    const formData = new FormData();
    formData.append('file',this.state.file)
  const options = {
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor( (loaded * 100) / total )
        console.log( `${loaded}kb of ${total}kb | ${percent}%` );

        if( percent < 100 ){
          this.setState({ percent: percent })
        }
      },
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials:true
    } 

    axios.post(`api/upload`, formData,options)      
.then(res=>{
this.setState({data:res.data})
this.setState({mess:"ok"})
 this.setState({ fl: res.data.url, percent: 100 }, ()=>{
          setTimeout(() => {
            this.setState({ percent: 0 })
          }, 1000);
        })
})
.catch(err=>{
    this.setState({errorMessage: err.response.data})
    if(this.state.errorMessage!==''){
      alert(this.state.errorMessage)
    }
   this.setState({mess:''})
})
}
onSubmit2(e){
  e.preventDefault();
  const data={
    from:this.state.send,
    to:this.state.rec,
    uuid:this.state.data.uuid
  }
  console.log(data)
  axios.post('/api/mail',data)
  .then(suc=>{
    alert(suc.data)
  })
  .catch(err=>{
    alert("Please fill details correctly")
  })
}
render(){
  const {percent}=this.state;
  return (
    <div>
         <div className="container-fluid" id="ms-container"> 
         <div className="uploadform">		                     
                       <form onSubmit={this.onSubmit} encType="multipart/form-data">
                         <i className="bi bi-upload icon"></i>
                              <span className="ms-1 d-sm-inline">
                                 <div className="nav-link px-0 align-middle text-dark">
                                  <input type="file" id="file" onChange={this.handleFileUpload}/>
                                   <button className="btn-emp" type="submit" value="submit">Upload</button>
                                        
                             
                           </div>
                              </span>
                             
              </form>                        
               { percent > 0 && <ProgressBar striped variant="warning" now={percent} active label={`${percent}%`} /> } 
              {(this.state.mess!=='')&& <>
              <div className='copytxt'>
                <h3>{this.state.data.url}</h3>
                <a href="#" onClick={this.onclick}><i class="bi bi-clipboard"></i></a>
              </div>    
              <h1>OR</h1>  
              <div>
                <form onSubmit={this.onSubmit2}>
              <div className="form-group">
                  <label className="form-label" for="name">Sender Email</label>
                  <input type="text" className="form-control"  placeholder="Sender Email" tabindex="1" required onChange={this.onchangesender}/>
              </div>                            
              <div className="form-group">
                  <label className="form-label" for="email">Receiver Email</label>
                  <input type="email" class="form-control"  placeholder="Receiver Email" tabindex="2" required onChange={this.onchangerec}/>
              </div>                                                                                
              <div className="text-center">
                  <button type="submit" className="btn btn-start-order">Send Mail</button>
              </div>
          </form>
          </div>
          </>
          }
              </div>        
</div>                             
    </div>
  );
}
}