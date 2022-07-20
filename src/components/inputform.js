import React, { useEffect, useState } from "react"; // << NO ERROR


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { conn } from "../store/connect"; // << NO ERROR
import Input from "@mui/material/Input";
import { makeStyles } from "@material-ui/styles";

import { SingleSelect } from './inputcomponents/singleselect'
import { FocusInput } from './inputcomponents/focusinput'

import * as lookups from "../lookups";

const {
    states,
    climate_zones,
    coefficient_cases,
    ashrae_standards,
    building_types,
    heating_fuels,
    hvac_templates
} = lookups;



const useStyles = makeStyles({
    root: {},
    tableContainer: {
        width: 1200,
        padding: 50,
        '& .MuiTableCell-head': {
            fontWeight: 700,
        },
        tableSpacer: {
            borderBottom: 'solid 2px black',
        },
    }
})



const InputForm = (props) => {
    const { case_inputs } = props;


    const styles = {
        sxRotate: { transform: 'rotate(-90deg)' }
    }

    const classes = useStyles();


    const handleSetCaseInputParameter = (payload) => {
        // payload: {key, value, case_id}
        props.actions.setCaseInputParameter(payload)
    }


    const handleSetCaseAreaInputParameter = (payload) => {
        // payload: {key, value, case_id, area_id}

        props.actions.setCaseAreaInputParameter(payload)

    }

    const dummyCallback = (c, e) => {

    }




    return <div className={classes.tableContainer}>

        <Table>
            <TableBody>
                <TableRow>
                    <TableCell variant="head" rowSpan={5} sx={styles.sxRotate}>GLOBAL</TableCell>
                    <TableCell variant="head">CASE NAME</TableCell>
                    {case_inputs.map((e, i) => <TableCell key={i}>
                        <FocusInput
                            inputType="string"
                            callback={(c) => props.actions.setCaseInputParameter({
                                case_id: e.case_id,
                                value: c,
                                key: 'case_name'
                            })}
                            value={e.case_name}
                        />
                    </TableCell>)}
                </TableRow>
                <TableRow>

                    <TableCell variant="head">STATE</TableCell>
                    {case_inputs.map((e, i) => <TableCell key={i}>
                        <SingleSelect
                            id={i}
                            label='State'
                            value={e.location_state}
                            callback={(c) => handleSetCaseInputParameter({
                                case_id: e.case_id,
                                value: c.target.value,
                                key: 'location_state'
                            })}
                            optionvalues={states}
                        />
                    </TableCell>
                    )}
                </TableRow>
                <TableRow>
                    <TableCell variant="head">CLIMATE ZONE</TableCell>
                    {case_inputs.map((e, i) => <TableCell key={i}>
                        <SingleSelect
                            id={i}
                            label='Climate Zone'
                            value={e.climate_zone}
                            callback={(c) => handleSetCaseInputParameter({
                                case_id: e.case_id,
                                value: c.target.value,
                                key: 'climate_zone'
                            })}
                            optionvalues={climate_zones}
                        />
                    </TableCell>
                    )}
                </TableRow>

                <TableRow>
                    <TableCell variant="head">PROJECTION CASE</TableCell>
                    {case_inputs.map((e, i) => <TableCell key={i}>
                        <SingleSelect
                            id={i}
                            label='Projection Case'
                            value={e.projection_case}
                            callback={(c) => handleSetCaseInputParameter({
                                case_id: e.case_id,
                                value: c.target.value,
                                key: 'projection_case'
                            })}
                            optionvalues={coefficient_cases}
                        />
                    </TableCell>
                    )}
                </TableRow>

                <TableRow>
                    <TableCell variant="head">HVAC Template</TableCell>
                    {case_inputs.map((e, i) => <TableCell key={i}>
                        <SingleSelect
                            id={i}
                            label='HVAC Template'
                            value={e.hvac_template}
                            callback={(c) => handleSetCaseInputParameter({
                                case_id: e.case_id,
                                value: c.target.value,
                                key: 'hvac_template'
                            })}
                            optionvalues={hvac_templates.map(d => d.tag)}
                            optiontitles={hvac_templates.map(d => d.case_name)}
                        />
                    </TableCell>
                    )}
                </TableRow>

                {case_inputs[0].design_areas.map(d => d.area_id).map(id => {

                    let area_case = case_inputs.map(d => d.design_areas.filter(e => e.area_id == id)[0])
                    let case_ids = case_inputs.map(d => d.case_id)

                    return (
                        <React.Fragment key={id}>

                            <TableRow>
                                <TableCell variant="head" rowSpan={7} sx={styles.sxRotate}>AREA TYPE {id + 1}</TableCell>
                                <TableCell variant="head">Building Type</TableCell>
                                {area_case.map((d, i) => <TableCell key={i}>
                                    <SingleSelect
                                        id={i}
                                        label='Building Type'
                                        value={d.building_type}
                                        callback={(c) => handleSetCaseAreaInputParameter({
                                            case_id: case_ids[i],
                                            area_id: d.area_id,
                                            value: c.target.value,
                                            key: 'building_type'
                                        })}
                                        optionvalues={building_types}
                                    />
                                </TableCell>
                                )}

                            </TableRow>
                            <TableRow>
                                <TableCell variant="head">Area</TableCell>

                                {area_case.map((d, i) => <TableCell key={i}>
                                    <FocusInput
                                        inputType="number"
                                        callback={(c) => handleSetCaseAreaInputParameter({
                                            case_id: case_ids[i],
                                            area_id: d.area_id,
                                            value: c,
                                            key: 'area'
                                        })}
                                        value={d.area}
                                    />
                                </TableCell>)}

                            </TableRow>

                            <TableRow>
                                <TableCell variant="head">ASHRAE Standard</TableCell>

                                {area_case.map((d, i) => <TableCell key={i}>
                                    <SingleSelect
                                        id={i}
                                        label='ASHRAE Standard'
                                        value={d.ashrae_standard}
                                        callback={(c) => handleSetCaseAreaInputParameter({
                                            case_id: case_ids[i],
                                            area_id: d.area_id,
                                            value: c.target.value,
                                            key: 'ashrae_standard'
                                        })}
                                        optionvalues={ashrae_standards}
                                    />
                                </TableCell>
                                )}
                            </TableRow>

                            <TableRow>
                                <TableCell variant="head">Heating Fuel</TableCell>

                                {area_case.map((d, i) => <TableCell key={i}>
                                    <SingleSelect
                                        id={i}
                                        label='Heating Fuel'
                                        value={d.heating_fuel}
                                        callback={(c) => handleSetCaseAreaInputParameter({
                                            case_id: case_ids[i],
                                            area_id: d.area_id,
                                            value: c.target.value,
                                            key: 'heating_fuel'
                                        })} optionvalues={heating_fuels}
                                    />
                                </TableCell>
                                )}
                            </TableRow>

                            <TableRow>
                                <TableCell variant="head">Heating COP</TableCell>

                                {area_case.map((d, i) => <TableCell key={i}>
                                    <FocusInput
                                        inputType="number"
                                        callback={(c) => handleSetCaseAreaInputParameter({
                                            case_id: case_ids[i],
                                            area_id: d.area_id,
                                            value: c,
                                            key: 'heating_cop'
                                        })}
                                        value={d.heating_cop}
                                    />
                                </TableCell>)}


                            </TableRow>
                            <TableRow>
                                <TableCell variant="head">DHW Fuel</TableCell>


                                {area_case.map((d, i) => <TableCell key={i}>
                                    <SingleSelect
                                        id={i}
                                        label='DHW Fuel'
                                        value={d.dhw_fuel}
                                        callback={(c) => handleSetCaseAreaInputParameter({
                                            case_id: case_ids[i],
                                            area_id: d.area_id,
                                            value: c.target.value,
                                            key: 'dhw_fuel'
                                        })}
                                        optionvalues={heating_fuels}
                                    />
                                </TableCell>
                                )}
                            </TableRow>

                            <TableRow>
                                <TableCell variant="head">DHW COP</TableCell>

                                {area_case.map((d, i) => <TableCell key={i}>
                                    <FocusInput
                                        inputType="number"
                                        callback={(c) => handleSetCaseAreaInputParameter({
                                            case_id: case_ids[i],
                                            area_id: d.area_id,
                                            value: c,
                                            key: 'dhw_cop'
                                        })}
                                        value={d.dhw_cop}
                                    />
                                </TableCell>)}
                            </TableRow>

                        </React.Fragment>
                    )
                })}

            </TableBody>
        </Table>
    </div>
}




const mapStateToProps = (store) => {
    return {
        isLoadingError: store.case_outputs.isLoadingError,
        case_inputs: store.case_inputs.case_inputs,
        isLoading: store.ui.isLoading,
    };
};



export default conn(mapStateToProps)(InputForm);
