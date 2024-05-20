import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "../common/customInput/CustomInput";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  {
    title: "Buyer's Name",
    align: 'left',
    name: 'fullname'

  },
  {
    title: 'Transaction Id',
    align: 'left',
    name: 'transaction'

  },
  {
    title: 'Paid At',
    align: 'left',
    name: 'date'
  },
  {
    title: 'Amount',
    align: 'left',
    name: 'amount'
  },
  {
    title: 'Action',
    align: 'left'
  }
]

const dummyData = [
  {
    fullname: 'James Bond',
    amount: 'Rs.10,000',
    date: '2022-06-16',
    transaction: 'tx-00001'
  },
  {
    fullname: 'Jack Sparrow',
    amount: 'Rs.12,000',
    date: '2022-06-22',
    transaction: 'tx-232323'
  },
  {
    fullname: 'Dr. Strange',
    amount: 'Rs.13,000',
    date: '2022-03-06',
    transaction: 'tx-12123213'
  },
  {
    fullname: 'James Bond',
    amount: 'Rs.10,000',
    date: '2022-06-16',
    transaction: 'tx-00001'
  },
  {
    fullname: 'Jack Sparrow',
    amount: 'Rs.12,000',
    date: '2022-06-22',
    transaction: 'tx-232323'
  },
  {
    fullname: 'Dr. Strange',
    amount: 'Rs.13,000',
    date: '2022-03-06',
    transaction: 'tx-12123213'
  },
  {
    fullname: 'James Bond',
    amount: 'Rs.10,000',
    date: '2022-06-16',
    transaction: 'tx-00001'
  },
  {
    fullname: 'Jack Sparrow',
    amount: 'Rs.12,000',
    date: '2022-06-22',
    transaction: 'tx-232323'
  },
  {
    fullname: 'Dr. Strange',
    amount: 'Rs.13,000',
    date: '2022-03-06',
    transaction: 'tx-12123213'
  }

]

const tStyle = {
  width: '19%',
  color: 'white',
  padding: '5px 5px 5px 25px'
}

export function Transaction() {

  const [filteredData, setFilteredData] = useState()

  const defaultValues = {
    from: '',
    to: ''
  }

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (values) => {
    console.log(values)
    if (values?.to !== '' || values?.from !== '') {
      const filter = dummyData?.filter((item) => item?.date >= values?.from && item?.date <= values?.to)
      setFilteredData(filter)
    }
  }

  console.log('Filtered Data----->', filteredData)

  return (
    <>
      <Box
        sx={{
          textAlign: "end",
          margiLeft: "0px",
          marginTop: "20px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          position: "sticky",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            position: "sticky",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          Transactions
        </Typography>
      </Box>
      <Paper elevation={2}
        sx={{
          padding: "20px",
          margin: "10px 0 0",
          height: "75vh",
          overflow: "scroll",
        }}>
        <form className='transactionForm' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item sm={12} sx={{ display: 'flex' }}>
              <div style={{ display: 'flex', marginRight: '20px', alignItems: 'center' }}>
                <Typography sx={{ marginRight: '8px' }}>From</Typography>
                <CustomInput
                  name='from'
                  type='date'
                  control={control}
                />
              </div>

              <div className='transactionInput' style={{ display: 'flex', marginRight: '20px', alignItems: 'center' }}>
                <Typography sx={{ marginRight: '8px' }}>To</Typography>
                <CustomInput
                  name='to'
                  type='date'
                  control={control}
                />
              </div>
              <Box sx={{ width: 'fit-content' }}>
                <Button variant='contained'
                  color='primary'
                  fullWidth
                  size='large'
                  type='submit'
                >
                  Filter
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        <TableContainer component={Paper} sx={{ marginTop: '15px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: '#6c7beb' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', padding: '0px 8px' }}>S.N</TableCell>
                {columns?.map((item, index) =>
                (
                  <TableCell
                    key={index}
                    align={item?.align}
                    sx={tStyle}
                  >{item?.title}
                  </TableCell>
                )
                )}
              </TableRow>
            </TableHead>
            {!filteredData && <TableBody>
              {dummyData?.map((item, index) =>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ padding: '5px' }}>{index + 1}.</TableCell>
                  {columns?.map((column, idx) => {
                    if (column?.title === 'Action') {
                      return (
                        <TableCell key={idx}
                          align={column?.align}
                          sx={{
                            width: '19%',
                            padding: '5px 5px 5px 25px',
                            columnGap: '20px !important'
                          }}>
                          <div style={{ display: 'flex', columnGap: '10px' }}>
                            <Tooltip arrow title='View Details'>
                              <RemoveRedEyeIcon sx={{ color: '#6c7beb' }} />
                            </Tooltip>
                            <Tooltip arrow title='Delete'>
                              <DeleteForeverIcon sx={{ color: 'red' }} />
                            </Tooltip>
                          </div>
                        </TableCell>
                      )
                    }
                    return (
                      <TableCell
                        key={idx}
                        align={column?.align}
                        sx={{
                          width: '19%',
                          padding: '5px 5px 5px 25px'
                        }}
                      >{item[column?.name]}</TableCell>)
                  }
                  )}
                </TableRow>
              )}
            </TableBody>}
            {
              filteredData &&
              <TableBody>
                {filteredData?.map((item, index) =>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ padding: '5px' }}>{index + 1}.</TableCell>
                    {columns?.map((column, idx) => {
                      if (column?.title === 'Action') {
                        return (
                          <TableCell key={idx}
                            align={column?.align}
                            sx={{
                              width: '19%',
                              padding: '5px 5px 5px 25px',
                              columnGap: '20px !important'
                            }}>
                            <div style={{ display: 'flex', columnGap: '10px' }}>
                              <Tooltip arrow title='View Details'>
                                <RemoveRedEyeIcon sx={{ color: '#6c7beb' }} />
                              </Tooltip>
                              <Tooltip arrow title='Delete'>
                                <DeleteForeverIcon sx={{ color: 'red' }} />
                              </Tooltip>
                            </div>
                          </TableCell>
                        )
                      }
                      return (
                        <TableCell
                          key={idx}
                          align={column?.align}
                          sx={{
                            width: '19%',
                            padding: '5px 5px 5px 25px'
                          }}
                        >{item[column?.name]}</TableCell>)
                    }
                    )}
                  </TableRow>
                )}
              </TableBody>
            }
          </Table>
        </TableContainer>

      </Paper>
    </>
  );
}
