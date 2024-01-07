import React from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../Styles/GameSelect.css'
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function GameSelect() {
    // const [open, setOpen] = useState(false);
    console.log("Gameselector")
    return (
        <>
    <div className="row">
        <div className="col">
 {/* <p className="d-inline-flex gap-1"> */}
            <div className="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#cutthroat-select" aria-expanded="false" aria-controls="collapseExample">
                    Cutthroat
                </button>
{/* </p> */}
                <div className="collapse" id="cutthroat-select">
                    <div className="card card-body">
                        Info about cutthroat plus a button to select the gametype
                    </div>
                    <Button>Select</Button>
                </div>
            </div>
        </div>
        <div className="col">

            <div className="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#standard-select" aria-expanded="false" aria-controls="collapseExample">
                    Standard
                </button>

                <div className="collapse" id="standard-select">
                    <div className="card card-body">
                        Info about regular pool plus a button to select the gametype
                    </div>
                    <Button>Select</Button>
                </div>
            </div>
        </div>
        <div className="col">

            <div className="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#nineball-select" aria-expanded="false" aria-controls="collapseExample">
                    Nine-Ball
                </button>

                <div className="collapse" id="nineball-select">
                    <div className="card card-body">
                        Info about nine-ball plus a button to select the gametype
                    </div>
                    <Button>Select</Button>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

export default GameSelect