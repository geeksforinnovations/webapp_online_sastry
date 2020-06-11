import React, { useEffect, useState } from 'react';
import Pujari from "../../models/Pujari";
import { setPujaries } from "../../actions/pujari.actions";
import { PujariCard } from '../../components/Pujari/PujariCard';
import { connect } from 'react-redux';
import { Typography, FormControlLabel, Checkbox, Switch, Button } from '@material-ui/core';

const PujariList = (props) => {
    const { pujaries, setPujaries, onSelectPujaries, goBack } = props;
    let [hasDefault, setDefault] = useState(false);
    let [selectedPujaries, setSelected] = useState([])

    const onPujariSelect = (pujari) => {
        let _pujaries = selectedPujaries;
        if (_pujaries.length < 3) {
            _pujaries.push(pujari)
            setSelected(_pujaries)
            return true
        } else {
            return false
        }

    }
    const onContinue = () => {
        if (hasDefault) {
            onSelectPujaries(pujaries.splice(0, 3))
        } else {
            if (selectedPujaries.length > 0) {
                onSelectPujaries(selectedPujaries)
            }
        }

    }

    const onRemove = (pujari) => {
        let _pujaries = selectedPujaries;
        _pujaries = _pujaries.filter(p => p.id != pujari.id)
        setSelected(_pujaries)
    }

    useEffect(() => {
        try {
            Pujari.getAll().then(resp => {
                const pujaries = resp.data.map(puja => {
                    return new Pujari(puja)
                })

                setPujaries(pujaries)
            })
        } catch (error) {
            throw error
        }
    }, [true]);
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', margin:'10px auto', width: '1024px' }}>
            <Button
                    variant="outlined" color="primary"
                    onClick={goBack}
                >
                    Back
              </Button>
                <FormControlLabel
                    align="center"
                    control={
                        <Switch
                            checked={hasDefault}
                            onChange={(e) => setDefault(e.target.checked)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Assign pujari based on availability"
                />
                <Button
                    variant="contained" color="primary"
                    onClick={() => onContinue()}
                >
                    Continue
              </Button>
            </div>

            {/* <Typography align="center" variant="h6" gutterBottom>
                You can choose upto 3 pujaries and will assign you based on availability
            </Typography> */}
            {hasDefault
                ?
                <Typography align="center" variant="h6" gutterBottom>
                    We will assign you based on availability </Typography>
                :
                <div>
                    <Typography align="center" variant="h6" gutterBottom>
                        You can choose upto 3 pujaries and will assign you based on availability</Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                        {pujaries.map((pujari, i) => {
                            return <PujariCard key={`${i}_mjn`} onRemove={onRemove} onSelect={onPujariSelect} pujari={pujari}></PujariCard>
                        })}
                    </div>
                </div>

            }

        </>

    );
}
const mapStateToProps = state => ({
    pujaries: state.pujaries.availablePujaries
})

const mapDispatchToProps = dispatch => ({
    setPujaries: pujaries => dispatch(setPujaries(pujaries))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PujariList)