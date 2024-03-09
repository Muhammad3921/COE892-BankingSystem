import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Collapse } from '@mui/material';
import { CiPillsBottle1 } from 'react-icons/ci';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './drugSupplyTrack.css';

const DrugSupplyTracker = () => {
  const [medications, setMedications] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');

    fetch(`/drug_supply_tracker/${storedUserId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Server Error');
        }
        return response.json();
      })
      .then(data => setMedications(data))
      .catch(error => console.error('Error fetching drug tracker data:', error));
  }, []);

  const handleExpandCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div>
      <div className="green__tile"></div>
      <Typography variant="h3" style={{ color: '#25b4ec', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Times New Roman, serif' }}>
        Drug Supply Tracker
      </Typography>
      {medications.map((medication, index) => (
        <div key={medication.id} style={{ display: 'flex', marginBottom: '10px' }}>
          <Card
            style={{
              borderRadius: '50px',
              backgroundColor: index === 0 ? '#25b4ec' : 'white',
              color: index === 0 ? 'white' : '#25b4ec',
              fontFamily: 'Times New Roman, serif',
              transform: 'scale(0.9)',
              width: '420px',
              marginRight: '10px',
              position: 'relative',
              marginBottom: expandedCard === index ? '25px' : '10px',
            }}
          >
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    backgroundColor: index === 0 ? '#25b4ec' : 'white',
                    borderRadius: '50%',
                    padding: '0px',
                  }}
                >
                  <CiPillsBottle1
                    size={90}
                    color={index === 0 ? 'white' : '#25b4ec'}
                    style={{
                      backgroundColor: index === 0 ? '#25b4ec' : 'white',
                      borderRadius: '50%',
                      padding: '8px',
                      marginTop: '-60px'
                    }}
                  />
                </div>
                <div>
                  <Typography variant="h5">{medication.title}</Typography>
                  <Typography variant="body1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridColumnGap: '1em' }}>
                    <span>Strength</span>
                    <span>Dosage</span>
                    <span>Start Date</span>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridColumnGap: '1em' }}>
                    <span>{medication.drug_strength}</span>
                    <span>{medication.dosage}</span>
                    <span>{new Date(medication.start_recur).toLocaleDateString('en-CA')}</span>
                  </Typography>
                  <Typography variant="body1" style={{marginTop:'10px',  fontSize: '17px'  }}>
                    Date Issued: {new Date(medication.date_issued).toLocaleDateString('en-CA')}
                  </Typography>
                  <Typography variant="body1" style={{marginTop:'5px', fontSize: '17px' }}>
                    Receipt #{medication.receipt_number}
                  </Typography>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '9px 0' }}>
                <div style={{ flex: '1', marginBottom: expandedCard === index ? '14px' : '0' }} />
                <div style={{ padding: '0', margin: '9px 0', position: 'absolute', right: '10px' }}>
                  <IconButton
                    style={{ padding: '0', margin: '0', marginTop: '-130px', }}
                    onClick={() => handleExpandCard(index)}
                    aria-expanded={expandedCard === index}
                    disableTouchRipple
                  >
                    <ArrowForwardIcon
                      style={{
                        fontSize: '35px',
                        color: index === 0 ? 'white' : '#25b4ec',
                      }}
                    />
                  </IconButton>
                </div>
              </div>
            </CardContent>
          </Card>

          <Collapse in={expandedCard === index}>
            <CardContent style={{ marginTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', maxHeight: '120px' }}>
                <div style={{ borderRadius: '50%', padding: '8px' }}>
                  <CiPillsBottle1
                    size={90}
                    color="#25b4ec"
                    style={{ backgroundColor: 'white', borderRadius: '50%', padding: '8px', marginTop: '-130px' }}
                  />
                </div>
                <div>
                  <Typography variant="h6">{medication.title}</Typography>
                  <Typography variant="body1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridColumnGap: '1em' }}>
                    <span>Strength</span>
                    <span>Dosage</span>
                    <span>End Date</span>
                  </Typography>
                  <Typography variant="body1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridColumnGap: '1em' }}>
                    <span>{medication.drug_strength}</span>
                    <span>{medication.dosage}</span>
                    <span>{new Date(medication.end_recur).toLocaleDateString('en-CA')}</span>
                  </Typography>
                  <Typography variant="body1" style={{ color: '#acacac', marginTop: '10px' }}>
                    Hospital Name: <span style={{ color: '#25b4ec' }}>{medication.hospital_name}</span>
                  </Typography>
                  <Typography variant="body1" style={{ color: '#acacac' }}>
                    Hospital Address: <span style={{ color: '#25b4ec' }}>{medication.hospital_address}</span>
                  </Typography>
                  <Typography variant="body1" style={{ color: '#acacac' }}>
                    Doctor Name: <span style={{ color: '#25b4ec' }}>{medication.doctor_name}</span>
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default DrugSupplyTracker;