import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import './drugInteractionChecker.css';

const columnsA = [
  { field: 'drug_name', headerName: 'Drug A', width: 200 }
];
const columnsB = [
  { field: 'drug_name', headerName: 'Drug B', width: 200 }
];

const DrugInteractionChecker = () => {

  const [medications, setMedications] = useState([]);
  const [isConflicting, setIsConflicting] = useState([]);
  const [rowSelectionAModel, setRowSelectionAModel] = useState([]);
  const [rowSelectionBModel, setRowSelectionBModel] = useState([]);
  const [medicineSelectedA, setMedicineSelectedA] = useState([]);
  const [medicineSelectedB, setMedicineSelectedB] = useState([]);
  const [isCompare, setIsCompare] = useState([]);
  
  useEffect(() => {

    fetch('/drug_interaction_checker/', {
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
      .catch(error => console.error('Error fetching drug interaction data:', error));
  }, []);

  const onCompare = async (drugAId, drugBId) => {
    if (drugAId === undefined || drugBId === undefined || drugAId === drugBId) {
      setIsCompare(false);
    }
    else {
      setIsCompare(true);
      setMedicineSelectedA(medications.find((item) => item.id === drugAId).drug_name);
      setMedicineSelectedB(medications.find((item) => item.id === drugBId).drug_name);

      fetch('/drug_interaction_checker/' + medications.find((item) => item.id === drugAId).drug_name, {
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
        if (data[0].conflicting_drug === medications.find((item) => item.id === drugBId).drug_name) {
          setIsConflicting(true);
        }
        else {
          setIsConflicting(false);
        }
      })
      .catch(error => console.error('Error fetching conflicting drug data:', error));
    }
  }

  const CompareSection = () => {
    if (isCompare.length === 0 || !isCompare) {
      return <Paper elevation={1} className='image'/>;
    }
    else {
      if (isConflicting === true) {
        return (
          <div className='compareContainer'>
            <h1 className='subHeaderText'>{medicineSelectedA}</h1>
            <h1 className='subHeaderText'>{medicineSelectedB}</h1>
            <span>Conflicts:</span>
            <div className='conflictContainer'>
              <Cancel style={{ fontSize: '50px' }}></Cancel>
              <p>Do not take both drugs together</p>
            </div>
          </div>
        )
      }
      else {
        return (
          <div className='compareContainer'>
            <h1 className='subHeaderText'>{medicineSelectedA}</h1>
            <h1 className='subHeaderText'>{medicineSelectedB}</h1>
            <span>Conflicts:</span>
            <div className='conflictContainer'>
              <CheckCircle style={{ fontSize: '50px' }}></CheckCircle>
              <p>No conflicts exists</p>
            </div>
          </div>
        );
      }
    }
  }

  return (
    <Grid container spacing={8} className='pharma-container'>
      <Grid item lg={8} className='content'>
          <div className='text-container'>
            <h1 className="header-text">Drug interaction checker</h1>
          </div>
          <Grid container spacing={8} className='pharma-container'>
            <Grid item lg={6} className='image-container'>
              <div style={{ height: 400 }}>
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
                        color: '#7B9B69'
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
                  }}
                  rowSelectionModel={rowSelectionAModel}
                />
              </div>
            </Grid>
            <Grid item lg={6} className='image-container'>
              <div style={{ height: 400, }}>
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
                        color: '#7B9B69'
                    }
                  }}
                  rows={medications}
                  columns={columnsB}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'name', sort: 'desc' }],
                    },
                  }}
                  disableColumnFilter
                  disableColumnMenu
                  hideFooter
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionBModel(newRowSelectionModel);
                  }}
                  rowSelectionModel={rowSelectionBModel}
                />
              </div>
            </Grid>
          </Grid>
          <Button onClick={() => onCompare(rowSelectionAModel[0], rowSelectionBModel[0])} id='compareButton'>
            Compare
          </Button>
      </Grid>
      <Grid item lg={4} className='image-container'>
        <CompareSection/>
      </Grid>
    </Grid>
  );
}

export default DrugInteractionChecker;
