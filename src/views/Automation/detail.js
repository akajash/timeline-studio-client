import React,{useState,useEffect} from 'react'

import Header from "../../components/Headers/Header.js";
import {fetchSingleWorkflow} from "../../api/index.js"
import CustomInput from "../../components/Form/Input.js"
import { useDispatch} from "react-redux";
import CustomSelect from "../../components/Form/SelectInputEvent.js";
import {deleteWorkflow,updateWorkflow} from '../../actions/workflow.js'

import {fetchAllPackages,fetchAllReferences, fetchSingleProject,pushPipeline} from "../../api/index.js"

import { updateProject} from "../../actions/projects.js";

import {deleteProject} from '../../actions/projects'

import { useHistory } from 'react-router';


import moment from 'moment'

import ReactDatetime from 'react-datetime'
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  
  Modal,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
 
  Col,
  
  CardBody,
  
  Button
} from "reactstrap";


const WorkflowDetail = (props) => {

  const history = useHistory()

  const [isModal,setIsModal] = useState(false);
  const [isDeleteModal,setIsDeleteModal] = useState(false);
const [isLoading,setIsLoading] = useState(true)

const [references,setReferences] = useState([])
const [packages,setPackages] = useState([])


const [automationData,setAutomationData] = useState({
  title: "",
  event: "",
  offset: "",
  actions: [
    {
      action:0,
      
    }
  ]
  
})

const [formData,setFormData] = useState({
  title: "",
  event: "",
  offset: "",
  actions: [
    {
      action:0,
      
    }
  ]
  
})

const events = [
{value: 1, label: "On new lead"},
{value: 2, label: "On Lead conversion"},
{value: 3, label: "On Post Production"},
{value: 4, label: "On Wrapped Up"},
{value: 5, label: "On Workforce Added"},
{value: 6, label: "On Task Assigned"},

]

const offsets = [
  {value: 1, label: "Immediately"},
  {value: 2, label: "After a day"},
  {value: 3, label: "After 3 days"},
  {value: 4, label: "After a week"},

  
  ]




  


const preload = () => {
  const id = props.match.params.id 
  setCurrentId(id)
  fetchSingleWorkflow(id).then((res) => {
    if(res.error){
      console.log(res.error)
    }
    else{
      setAutomationData(res.data)
    }

    
  })


  setIsLoading(false)
}
 


  const [currentId,setCurrentId] = useState(null)
  
 

  const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)

    
  }
 

  const handleChange = (e) => {
      setAutomationData({...automationData, [e.target.name]: e.target.value})
    }
  

    const toggleDeleteModal = () => {
      setIsDeleteModal((prevIsModal) => !prevIsModal)
      console.log("deletes")
      
    }
  
    const dispatch = useDispatch()


    useEffect(() => {
      preload();
      
      
    },[])


    const handleSubmit = (e) => {
      e.preventDefault();
    
      
    
      
      dispatch(updateWorkflow(currentId, {...automationData}))

      // setAutomationData(formData)
      
      
    
      
  
    }
    
    const handleDelete = (currentId) => {
      dispatch(deleteWorkflow(currentId))
      toggleDeleteModal()
      history.push("/app/settings/workflow")
    }
    
    
    // const addService = () => {
    //   setFormData({...formData,services:[...formData.services,{service: "",quantity: 0}]})
      
    // }
    
    // const deleteService = (index) => {
    //     const values = [...formData.services]
    //     values.splice(index,1)
    //     setFormData({...formData, services:values})
    // }
    
    const handleChangeActions = (index,e) => {
      const values = [...automationData.events]
      values[index][e.target.name] = e.target.value;
      setAutomationData({...automationData, events:values})
    }
    
    const mailAutomation = () => {
      setAutomationData({...automationData,actions:[...automationData.actions,{action: "1",label: "Send Mail",rec: 0}]})
      toggleModal()
    }

    const handleActions = (action_id) => {

      toggleModal()
    }

  return(
      <>
      <Header/>
      <Container className="mt--7" fluid>
          <Row>
              <Col>
                  <Card className="shadow">
                      <CardHeader className="border-0">
                      <Row className="align-items-center">
                          <div className="col">
                              <h3 className="mb-0">Workflow Detail</h3>
                          </div>
                          <div className="col text-right">
                              
                          
                          <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-primary"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          
                          
                          
                          <DropdownItem onClick={() => handleActions(1)}>Send mail</DropdownItem>
                          <DropdownItem onClick={() => handleActions(2)}>Send Invoice</DropdownItem>
                          <DropdownItem onClick={() => handleActions(3)}>Assign Tasks</DropdownItem>
                          


                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
                  
                          </div>
                         
                          
                          </Row>
                          
                      </CardHeader>
                      <CardBody>
                      <Form onSubmit={handleSubmit} autoComplete="off">
                  
                  <div className="">
                    <Row>
                      <CustomInput label="Workflow Name" 
                            type="text"
                            placeholder="Eg., Wedding Workflow" 
                            idName = "input-event-name"
                            name="title"
                            onChange = {handleChange}
                            col="12"
                            value={automationData.title}
                            />

                          </Row>
                          <Row>

                    <Col lg={6}>      
                      <CustomSelect 
                        heading="On Event"
                        options={events} 
                        id='_id'
                        label="label"
                        prompt="On Event"
                        value={automationData.event}
                        onChange={val => setAutomationData({...automationData, event: val?.value})}
                        />
                    </Col>
                  
                    <Col lg={6}>      
                      <CustomSelect 
                        heading="Offset"
                        options={offsets} 
                        id='_id'
                        label="label"
                        prompt="Immediately"
                        value={automationData.offset}
                        onChange={val => setAutomationData({...automationData, offset: val?.value})}
                        />
                    </Col>
                      
                      
                    </Row>

                   
                   
                    
        </div>
        
        
        
                 
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={toggleDeleteModal}
              >
                Delete
              </Button>
              <Button color="primary" type="submit">
                Save changes
              </Button>
           
                </Form>
           
                          
                          
                      </CardBody>
                      
                  </Card>
              </Col>
          </Row>


          <Modal
            className="modal-dialog-centered modal-xl p-0"
            isOpen={isModal}
            toggle={toggleModal}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Choose an action
              </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={toggleModal}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
            <Row>
              <Col lg={6}>

              </Col>
            </Row>
            
                
            </div>

            
          </Modal>

          <Modal
            className="modal-dialog-centered p-0"
            isOpen={isDeleteModal}
            toggle={toggleDeleteModal}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Project?
              </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={toggleDeleteModal}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the current workflow? This operation cannot be undone.</p>
            </div>
                  <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={toggleDeleteModal}
              >
                Close
              </Button>
              <Button color="danger" type="submit" onClick={() => handleDelete(currentId)}>
                Confirm Delete
              </Button>
            </div>
                
            

            
          </Modal>


      </Container>
      </>
  )

    
}

export default WorkflowDetail