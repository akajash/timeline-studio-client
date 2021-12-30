import React,{useState,useEffect,useRef} from "react";
import moment from 'moment'

import ReactDatetime from 'react-datetime'
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
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
  
  
  
  Button
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";


import CustomPagination from "./pagination.js"
import CustomInput from "../../components/Form/Input.js"
import CustomSelect from "../../components/Form/SelectInputEvent.js";
import { useDispatch,useSelector } from "react-redux";
import WorkflowList from "./list.js";
import { createWorkflow, fetchWorkflows } from "../../actions/workflow.js";


const Automation = () => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const [isModal,setIsModal] = useState(false);

 

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

const events = [
  {value: 1, label: "On new lead"},
  {value: 2, label: "On Lead conversion"},
  {value: 3, label: "On Post Production"},
  {value: 4, label: "On Wrapped Up"},
  {value: 5, label: "On Workforce Added"},
  {value: 6, label: "On Task Assigned"},
  
]



const [currentId,setCurrentId] = useState(null)




  const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)
    clear()
  }

  const dispatch = useDispatch()
  const automation = useSelector((state) => state.projects)
  
  


  useEffect(() => {
    
    dispatch(fetchWorkflows(1))
    
  },[])



    

    const handleChange = (e) => {
      setAutomationData({...automationData, [e.target.name]: e.target.value})
    }

const handleSubmit = (e) => {
  e.preventDefault();

  


  dispatch(createWorkflow({...automationData}))
  

  clear()
  toggleModal()
}


const clear = () => {
  setCurrentId(0);
  setAutomationData({
    title: "",
    event: "",
    offset: "",
    actions: [
      {
        action:0,
        
      }
    ]
})
}


  
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                {/* <h3 className="mb-0">Card tables</h3> */}
                <Row className="align-items-center">
                <div className="col">
                    <h3 className="mb-0">Workflow</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggleModal}
                      size="sm"
                    >
                      Workflow +
                    </Button>
                  </div>
                  </Row>

                
          
          
        

              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  

                  {!automation.length ? "Loading": (
                    automation.map((w) => (
                        
                      <WorkflowList  workflow={w} setCurrentId={setCurrentId} setIsModal = {setIsModal} workflowkey={w._id} />
                      
                    ))
                  )}
                  
                </tbody>
              </Table>
              <CustomPagination/>
            </Card>
          </div>
        </Row>
        

          <Modal
            className="modal-dialog-centered modal-xl p-0"
            isOpen={isModal}
            toggle={toggleModal}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                WORKFLOW DETAILS
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
            <Form onSubmit={handleSubmit} autoComplete="off">
                  
                  <div className="">
                    <Row>
                      <CustomInput label="Workflow Name" 
                            type="text"
                            placeholder="Eg., Wedding Workflow" 
                            idName = "input-event-name"
                            name="title"
                            onChange = {handleChange}
                            col="6"
                            value={automationData.title}
                            />

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
                  
                      
                      
                    </Row>
                   
                   
                    
        </div>
        
        
        
                  <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={toggleModal}
              >
                Close
              </Button>
              <Button color="primary" type="submit">
                Save changes
              </Button>
            </div>
                </Form>
            </div>

            
          </Modal>
          

      </Container>
    </>
  );
};

export default Automation;
