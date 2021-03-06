import React, { Component }from 'react';

export default function WithAuth(WrappedComponent) {
  return class extends Component {

    componentDidMount(){
      const token = localStorage.getItem('token')

      if(!token){
        this.props.history.push('/login')
      } else {

        const reqObj = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }

        fetch('http://localhost:3001/current_user', reqObj)
          .then(resp => resp.json())
          .then(data => {
            if(data.error) {
              this.props.history.push('/login')
            } else {
              this.props.loginSuccess(data)
      
            }
          })
      
          fetch('http://localhost:3001/equipment_types')
          .then(resp =>resp.json())
          .then(data => this.props.setEquipmentTypes(data))
          
          fetch('http://localhost:3001/equipment_models')
          .then(resp =>resp.json())
          .then(data => this.props.setEquipmentModels(data))

          fetch('http://localhost:3001/owned_equipments')
          .then(resp => resp.json())
          .then(data => {          
            data.sort(function(a,b){
              return a.model_id - b.model_id
          })
            this.props.setAllOwnedEquipment(data)
          })
  
          fetch('http://localhost:3001/events')
          .then(resp => resp.json())
          .then(data => {
            data.sort(function(a,b){
              return new Date(a.start_date) - new Date(b.start_date)
            })
            this.props.setAllEvents(data)
          })
        
          fetch('http://localhost:3001/equipment_rentals')
          .then(resp => resp.json())
          .then(data => {
            data.sort(function(a,b){
              return new Date(a.event.start_date) - new Date(b.event.start_date)
            })
            this.props.setAllRentals(data)
          })
        }

      }

    render() {
      return <WrappedComponent  {...this.props}/>;
    }
  };
}