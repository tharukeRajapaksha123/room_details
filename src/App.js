import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import styled from "styled-components"
import { Fade } from 'react-reveal';


const Container = styled.div`
  height: 100vh; 
`

const Card = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  margin: 16px 0px;
  background-color: grey;
  align-items: center;
  border-radius: 6px;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`

const Image = styled.img`
  width: 50vw;
  height: 100%;
  object-fit: fill;
`


const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 16px;
  height: 190px;
  width: 100%;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`

const Spacer = styled.div`
  flex: 1;
`

function App() {
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8080/room-controller").then(result => {
      setRooms(result.data.Rooms)
    }).catch(err => console.log(`get room details failed ${err}`))
  }, [])
  return (
    <Container>
      {
        rooms.map(room => {
          return <Card key={room["_id"]} style={{
            listStyleType: "none",
            backgroundImage: `url(${room["image_url"]})`
          }}
          >
            {/* <Image src={`${room["image_url"]}`} alt={`${room["_id"]}`} /> */}
            <Spacer />
            <Fade left>
              <Right>
                <h3>
                  Room Type :   {room["type"]} Room
                </h3>
                <h3>
                  Per day Cost :   {room["cost_per_day"]} LKR
                </h3>
                <h3>
                  No of Beds :   {room["no_of_beds"]}
                </h3>
                <h5>
                  Facilities :   {room["facilities"]}
                </h5>

              </Right>
            </Fade>
            <Spacer />
          </Card>
        })
      }
    </Container>
  );
}

export default App;
