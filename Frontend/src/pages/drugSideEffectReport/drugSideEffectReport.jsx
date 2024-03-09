import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import './drugSideEffectReport.css';

const columnsA = [
  { field: 'drug_name', headerName: 'Medicine Name', width: 200 }
];

const DrugSideEffectReport = () => {

  const [medications, setMedications] = useState([]);
  const [MedicationCommonUses, setMedicationCommonUses] = useState([]);
  const [MedicationSideEffects, setMedicationSideEffects] = useState([]);
  const [rowSelectionAModel, setRowSelectionAModel] = useState([]);
  const [medicineSelectedA, setMedicineSelectedA] = useState([]);
  const [isSelect, setIsSelected] = useState([]);
  

  useEffect(() => {
    fetch('/side-effect-report', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Server Error');
      }
      return response.json();
    })
    .then(data => setMedications(data))
    .catch(error => console.error('Error fetching drug data:', error));
}, []);

  const onCompare = async (drugAId) => {
    
    if (drugAId === undefined) {
      setIsSelected(false);
    }
    else {
      setIsSelected(true);
      setMedicineSelectedA(medications.find((item) => item.id === drugAId).drug_name);
      fetch('/side-effect-report/' + medications.find((item) => item.id === drugAId).drug_name, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Server Error');
        }
        return response.json();
      })
      .then(data => {
        setMedicationCommonUses(data[0].common_uses);
        setMedicationSideEffects(data[0]["Side Effects"].join(" | "));
      })
      .catch(error => console.error('Error fetching drug data:', error));
    }
  }

  const SelectSection = () => {
    if (isSelect.length === 0 || !isSelect) {
      return <Paper elevation={1} className='image'/>;
    }
    else {
      return (
        <div className='selectContainer'>
          <h1 className='subHeaderText'>{medicineSelectedA}</h1>
          <span>Common Uses:</span>
          <p>{MedicationCommonUses}</p>
          <span>Side Effects:</span>
          <p>{MedicationSideEffects}</p>
        </div>
      );
    }
  }

  return (
    <Grid container spacing={8} className='pharma-container'>
      <Grid item lg={12} className='content'>
          <div className='text-container'>
            <h1 className="header-text">Side Effect Report</h1>
          </div>
          <Grid container spacing={8} className='pharma-container'>
            <Grid item lg={6} className='image-container'>
              <div style={{ height: 600 }}>
                <DataGrid
                  style={{ border: 'none' }}
                  sx={{
                    '.MuiDataGrid-row.Mui-selected': {
                      backgroundColor: 'rgba(123, 155, 105, 1)',
                      color: '#FFF'
                    },
                    '.MuiDataGrid-row.Mui-hovered': {
                      backgroundColor: 'rgba(123, 155, 105, 0.08)'
                    },
                    '.MuiDataGrid-row.Mui-selected.Mui-hovered': {
                      backgroundColor: 'rgba(123, 155, 105, 1)',
                      color: '#FFF'
                    },
                    '.MuiDataGrid-columnSeparator': {
                        display: 'none'
                    },
                    '.MuiDataGrid-main': {
                        fontFamily: 'Montserrat'
                    },
                    '.MuiDataGrid-columnHeaders': {
                        fontWeight: '500',
                        fontSize: '1.2em',
                        color: '#f1860b'
                    }
                  }}
                  rows={medications}
                  columns={columnsA}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'name', sort: 'desc' }],
                    },
                  }}
                  disableColumnFilter
                  disableColumnMenu
                  hideFooter
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionAModel(newRowSelectionModel);
                    onCompare(newRowSelectionModel[0])
                  }}
                  rowSelectionModel={rowSelectionAModel}
                />
              </div>
            </Grid>
            <Grid item lg={6} className='image-container'>
              <SelectSection/>
            </Grid>
          </Grid>
      </Grid>

    </Grid>
  );
}

export default DrugSideEffectReport;
