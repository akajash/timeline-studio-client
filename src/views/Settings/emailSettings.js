import React,{useState,useEffect} from 'react'
// import { useDispatch,useSelector } from 'react-redux'
import { Container,Form,Row,Col,FormGroup, InputGroup, Button } from 'reactstrap'
import { fetchMailSettings, updateMailSettings } from '../../api/index.js'
import CustomInput from "../../components/Form/Input.js"


const EmailSettings = () => {

    const [isSSL,setIsSSL] = useState(true)

    const switchEncryption = () => {
      setIsSSL((prevIsSSL) => !prevIsSSL)
      setInitialData({...initialData, ssl: isSSL})
    }

    const [initialData,setInitialData] = useState({
        server: "",
        username: "",
        password: "",
        port: "",
        ssl: false
         
    })

    useEffect(() => {
      fetchMailSettings()
      .then((data) => {
        
        setInitialData(data.data)

      })
      

    },[])

    const handleChange = (e) => {
        setInitialData({...initialData, [e.target.name]: e.target.value})
      }

      const handleSubmit = (e) => {
        e.preventDefault();
      
        updateMailSettings({...initialData})
        
       
      
      }
    

    return(
        <>
        <div className="header adjusted bg-primary pb-4 pt-2 pt-md-5 mb-4"></div>
        <div className="m-2"></div>
        <Container>
        <Form onSubmit={handleSubmit} autoComplete="off">
                  
                  
                    <Row>
                      <CustomInput label="SMTP URL" 
                            type="text"
                            placeholder="" 
                            idName = "input-server"
                            name="server"
                            onChange = {handleChange}
                            col="4"
                            value={initialData.server}
                            />

                    
                      
                      
                    </Row>
                    <Row>
                      <CustomInput label="Username" 
                            type="text"
                            placeholder="" 
                            idName = "input-username"
                            name="username"
                            onChange = {handleChange}
                            col="4"
                            value={initialData.username}
                            />

                    
                      
                      
                    </Row>
                    <Row>
                    <CustomInput label="Password" 
                            type="password"
                            placeholder="*****" 
                            idName = "input-pwd"
                            name="password"
                            onChange = {handleChange}
                            col="4"
                            
                            />
                    </Row>

                    <Row>
                    <CustomInput label="PORT" 
                            type="number"
                            placeholder="" 
                            idName = "input-port"
                            name="port"
                            onChange = {handleChange}
                            col="4"
                            value={initialData.port}
                            
                            />
                    </Row>

                    <Row>
                    <Col lg={4}>
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-ssl"
                            >
                                Use SSL
                            </label>
                            <InputGroup>
                                <label className="custom-toggle">
                                <input type="checkbox" onChange={switchEncryption} id="input-ssl" checked={initialData.ssl} />
                                <span className="custom-toggle-slider rounded-circle" />
                                </label>
                            </InputGroup>
                            
                        </FormGroup>
                    </Col>
                    </Row>


                    
                    
                 
                  
                  
                  
              
              <Button color="primary" type="submit">
                Save changes
              </Button>
           
                </Form>
        </Container>
        </>
    )
}

export default EmailSettings