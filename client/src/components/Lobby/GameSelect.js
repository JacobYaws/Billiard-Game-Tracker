import React, { useState } from 'react'
import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/GameSelect.css'
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function GameSelect() {
    // const [open, setOpen] = useState(false);
    console.log("Gameselector")
    return (
        <>
    <div class="row">
        <div class="col">
 {/* <p class="d-inline-flex gap-1"> */}
            <div class="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#cutthroat-select" aria-expanded="false" aria-controls="collapseExample">
                    Cutthroat
                </button>
{/* </p> */}
                <div class="collapse" id="cutthroat-select">
                    <div class="card card-body">
                        Info about cutthroat plus a button to select the gametype
                    </div>
                    <Button>Select</Button>
                </div>
            </div>
        </div>
        <div class="col">

            <div class="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#standard-select" aria-expanded="false" aria-controls="collapseExample">
                    Standard
                </button>

                <div class="collapse" id="standard-select">
                    <div class="card card-body">
                        Info about regular pool plus a button to select the gametype
                    </div>
                    <Button>Select</Button>
                </div>
            </div>
        </div>
        <div class="col">

            <div class="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#nineball-select" aria-expanded="false" aria-controls="collapseExample">
                    Nine-Ball
                </button>

                <div class="collapse" id="nineball-select">
                    <div class="card card-body">
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