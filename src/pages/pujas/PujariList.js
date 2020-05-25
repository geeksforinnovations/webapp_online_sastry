import React, { useEffect } from 'react';
import Pujari from "../../models/Pujari";
import { setPujaries } from "../../actions/pujari.actions";
import PujariCard from '../../components/Pujari/PujariCard';
import { connect } from 'react-redux';

const PujariList = (props) => {
    const { pujaries, handleNext, setPujaries } = props;

    useEffect(() => {
        try {
            Pujari.getAll().then(resp => {
                const pujaries = resp.data.map(puja => {
                    return new Pujari(puja)
                })
                console.log(pujaries[0].name);
                
                setPujaries(pujaries)
            })
        } catch (error) {
            throw error
        }
    }, []);
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {pujaries.map((pujari, i) => {
                return <PujariCard key={`${i}_mjn`} onBook={handleNext} pujari={pujari}></PujariCard>
            })}
        </div>

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