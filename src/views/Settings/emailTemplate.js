import React,{useState,useEffect} from "react";
import TextEditor from '../../components/Form/TextEditor'



// reactstrap components
import {
  
  Card,
  CardHeader,
  
  Table,
  Container,
  Row,
  
  Modal,
  Form,
  Col,
  Button
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";

import CustomPagination from "./pagination.js"
import CustomInput from "../../components/Form/Input.js"
import { useDispatch,useSelector } from "react-redux";

import TemplateList from "./list.js";

import { fetchTemplate, updateTemplate,createTemplate} from "../../actions/emailTemplate.js";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';



const EmailTemplate = () => {
    
    const user = JSON.parse(localStorage.getItem('profile'));
    const [isModal,setIsModal] = useState(false);

  

    const [body, setBody] = useState('')
    const [templateData,setTemplateData] = useState({
        title: "",
        subject: ""
    })


const [currentId,setCurrentId] = useState(null)


  const toggleModal = () => {
    setIsModal((prevIsModal) => !prevIsModal)
    clear()
  }

  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)
  
  const dataSpecific = useSelector((state) => currentId ? state.data.find((p) => p._id === currentId) : null);


  useEffect(()=>{
    dispatch(fetchTemplate())
  },[dispatch])

 

    useEffect(() => {
      if(dataSpecific) {
       setTemplateData(dataSpecific);
       setBody(dataSpecific.body)
      }
    },[dataSpecific])

    

    const handleChange = (e) => {
      setTemplateData({...templateData, [e.target.name]: e.target.value})
    }

const handleSubmit = (e) => {
  e.preventDefault();

  

  if(currentId){
    templateData.body = "body"
    templateData["body"] = body
    dispatch(updateTemplate(currentId, {...templateData}))
  }
  else{
    templateData.body = "body"
    templateData["body"] = body
    dispatch(createTemplate({...templateData}))
  }

  clear()
  toggleModal()
}


const clear = () => {
  setCurrentId(0);
  setTemplateData({
    title: "",
    subject: ""
  })
  setBody('')
}

  return (
    <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>

      
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
                    <h3 className="mb-0">Email Templates</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggleModal}
                      size="sm"
                    >
                      Template +
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
                  

                  {!data?.length ? "Loading": (
                    data.map((d) => (
                        
                      <TemplateList  data={d} setCurrentId={setCurrentId} setIsModal = {setIsModal} templatekey={d._id} />
                      
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
                EMAIL TEMPLATE
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
                      <CustomInput label="Template Name" 
                            type="text"
                            placeholder="" 
                            idName = "input-title"
                            name="title"
                            onChange = {handleChange}
                            col="12"
                            value={templateData.title}
                            />

                    
                      
                      
                    </Row>
                    <Row>
                      <CustomInput label="Subject" 
                            type="text"
                            placeholder="" 
                            idName = "input-subject"
                            name="subject"
                            onChange = {handleChange}
                            col="12"
                            value={templateData.subject}
                            />

                    
                      
                      
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <ReactQuill
                            theme = 'snow'
                            value={body}
                            onChange={setBody}
                            
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
    )
}

export default EmailTemplate