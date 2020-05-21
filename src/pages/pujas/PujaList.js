import React, { useEffect } from 'react';
import Puja from "../../models/Puja";
import { APIs } from "../../APIs/API";
import { setPujas } from "../../actions/puja.actions";
import PujaCard from '../../components/Puja/PujaCard';
import { connect } from 'react-redux';

const PujaList = (props) => {
    const { pujas, handleNext, setPujas } = props;

    useEffect(() => {
        try {
            APIs.getPujas().then(resp => {
                const pujas = resp.data.map(puja => {
                    return new Puja(puja)
                })
                setPujas(pujas)
            })
        } catch (error) {
            throw error
        }
    }, []);
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {pujas.map(puja => {
                return <PujaCard onBook={handleNext} puja={puja}></PujaCard>
            })}
        </div>

    );
}
const mapStateToProps = state => ({
    pujas: state.pujas.availablePujas
})

const mapDispatchToProps = dispatch => ({
    setPujas: pujas => dispatch(setPujas(pujas))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PujaList)