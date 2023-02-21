import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import A from "./image/A.png";
import Petch from "./image/Petch.png";
import Plam from "./image/Plam.png";
import Nok from "./image/Nok.png";
import BB from "./image/BB.png";
import Tor from "./image/Tor.png";
import { Grid, Container, Typography } from "@mui/material";
export interface Item {
  img?: string;
  name?: string;
  id?: string;
}
function Home() {
  const item = [
    {
      img: Tor,
      name: "นายธีรวัฒน์ อื้อศรีวงศ์ ",
      id: "รหัสนักศึกษา: B6117603",
    },
    {
      img: BB,
      name: "นางสาวบุษกร คารมย์ ",
      id: "รหัสนักศึกษา: B6215576",
    },
    {
      img: Plam,
      name: "นางสาวปาลิดา สุวรรณรัตน์ ",
      id: "รหัสนักศึกษา: B6217174",
    },
    {
      img: A,
      name: "นางสาวรจนา วันทายุทธ์ ",
      id: "รหัสนักศึกษา: B6300104",
    },
    {
      img: Petch,
      name: "นายธนโชติ ศักดิ์ธรรมเจริญ ",
      id: "รหัสนักศึกษา: B6309343",
    },
    {
      img: Nok,
      name: "นายพิริยกร ขันโอ",
      id: "รหัสนักศึกษา: B6325855",
    },
  ];
  return (
    <Container className="container" maxWidth="md" >
      <Box sx={{ display: "flex", m: 1 }}>
        <Paper
          elevation={2}
          style={{ width: "100%", textAlign: "center", fontSize: 36 }}
        >
          ระบบรถพยาบาล กลุ่มที่ 7
        </Paper>
      </Box>
      <Box sx={{ display: "flex", m: 3 }}>
        <Paper
          elevation={2}
          sx={{
            padding: 2.5,
            borderRadius: 3,
          }}
          style={{ width: "100%", textAlign: "center" }}
        >
          <Grid item xs={12} container style={{ marginTop: 5 }}>
            {item.map((item: Item) => {
              return (
                <Grid item xs={4}>
                  <img
                    style={{ width: "200px", height: "200px" }}
                    className="img"
                    alt={item?.img}
                    src={item?.img}
                  />
                  <div className="name">
                    <a>{item.name}</a>
                    <br />
                    <a>{item.id}</a>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default Home;
