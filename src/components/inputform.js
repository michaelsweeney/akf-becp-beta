import React, { useEffect, useState } from "react"; // << NO ERROR


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'
import { conn } from "../store/connect"; // << NO ERROR
import Input from "@mui/material/Input";
import { makeStyles } from "@material-ui/styles";
import { fabClasses } from "@mui/material";

const useStyles = makeStyles({
    root: {},
    tableContainer: {
        width: 1200,
        padding: 50,
        '& .MuiTableCell-head': {
            color: 'red !important',
            fontWeight: 700,

        },
        tableSpacer: {
            borderBottom: 'solid 2px black',
        },
        bold: {
        },

    }

})




const InputForm = (props) => {
    const { case_inputs } = props;

    let design_area_ids = case_inputs[0].design_areas.map(d => d.area_id)
    let design_areas = case_inputs.map(d => d.design_areas)

    const classes = useStyles();



    return <div className={classes.tableContainer}>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell variant="head" rowSpan={4}>GLOBAL</TableCell>
                    <TableCell variant="head">CASE NAME</TableCell>
                    {case_inputs.map((e, i) => <TableCell key={i}>{e.case_name}</TableCell>)}
                </TableRow>
                <TableRow>
                    <TableCell variant="head">STATE</TableCell>
                    {case_inputs.map((e, i) => <TableCell key={i}><Input value={e.state}></Input></TableCell>)}
                </TableRow>

                <TableRow>
                    <TableCell variant="head">CLIMATE ZONE</TableCell>
                    {case_inputs.map((e, i) => <TableCell key={i}>{e.climate_zone}</TableCell>)}
                </TableRow>

                <TableRow>
                    <TableCell variant="head">PROJECTION CASE</TableCell>
                    {case_inputs.map((e, i) => <TableCell key={i}>{e.projection_case}</TableCell>)}
                </TableRow>



                {design_area_ids.map(id => {

                    let area_case = case_inputs.map(d => d.design_areas.filter(e => e.area_id == id)[0])


                    return (
                        <React.Fragment key={id}>
                            <TableRow>
                                <TableCell variant="head" rowSpan={7}>AREA TYPE {id + 1}</TableCell>
                                <TableCell variant="head">Area</TableCell>
                                {area_case.map((d, i) => <TableCell key={i}>{d.area}</TableCell>)}
                            </TableRow>


                            <TableRow>
                                <TableCell variant="head">Building Type</TableCell>
                                {area_case.map((d, i) => <TableCell key={i}>{d.building_type}</TableCell>)}
                            </TableRow>

                            <TableRow>
                                <TableCell variant="head">ASHRAE Standard</TableCell>
                                {area_case.map((d, i) => <TableCell key={i}>{d.ashrae_standard}</TableCell>)}
                            </TableRow>

                            <TableRow>
                                <TableCell variant="head">Heating Fuel</TableCell>
                                {area_case.map((d, i) => <TableCell key={i}>{d.heating_fuel}</TableCell>)}
                            </TableRow>

                            <TableRow>
                                <TableCell variant="head">Heating COP</TableCell>
                                {area_case.map((d, i) => <TableCell key={i}>{d.heating_cop}</TableCell>)}
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head">DHW Fuel</TableCell>
                                {area_case.map((d, i) => <TableCell key={i}>{d.dhw_fuel}</TableCell>)}
                            </TableRow>

                            <TableRow>
                                <TableCell variant="head">DHW COP</TableCell>
                                {area_case.map((d, i) => <TableCell key={i}>{d.dhw_cop}</TableCell>)}
                            </TableRow>

                        </React.Fragment>


                    )

                })}

            </TableBody>
        </Table>
    </div >

}





const mapStateToProps = (store) => {
    return {
        isLoadingError: store.case_outputs.isLoadingError,
        case_inputs: store.case_inputs.case_inputs,
        isLoading: store.ui.isLoading,
    };
};



export default conn(mapStateToProps)(InputForm);
