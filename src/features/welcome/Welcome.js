import React, { useCallback, useState } from 'react'
import { FakeText, IconButton, TextField, Typography } from '@totalsoft/rocket-ui'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { useEmail } from 'hooks/useEmail'
import { validateEmail } from 'utils/functions'
import { emptyString } from 'utils/constants'
import { useQuery } from '@apollo/client'
import { MY_FIRST_QUERY } from './gql/queries'

function Welcome() {
  const { t } = useTranslation()
  const [email, setEmail] = useEmail()
  const [textFieldValue, setTextFieldValue] = useState(email)
  const [isValid, setIsValid] = useState(true)
  const {loading, data} = useQuery(MY_FIRST_QUERY)

  const handleButtonClick = useCallback(() => {
    const isEmailValid = validateEmail(textFieldValue)
    setEmail(isEmailValid ? textFieldValue : emptyString)
    setIsValid(isEmailValid)
  }, [setEmail, textFieldValue])

  const handleKeyDown = useCallback(
    event => {
      if (event.keyCode === 13) {
        handleButtonClick()
      }
    },
    [handleButtonClick]
  )

  return (
    <Grid container justify='center' alignItems='center' alignContent='center' direction='column' spacing={10}>
      <Grid item xs={4}>
        {loading ? <FakeText lines={1}/> : <Typography variant='h5'>{data?.helloWorld}</Typography>}
      </Grid>
      <Grid item container justify='center' alignItems='center' alignContent='center' direction='column' spacing={1}>
        <Grid item xs={12}>
          <Typography variant='caption'>{t('LandingPage.Subtitle')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            endAdornment={
              <IconButton size='tiny' color='secondary' aria-label='go' onClick={handleButtonClick}>
                <KeyboardReturnIcon fontSize='small' />
              </IconButton>
            }
            value={textFieldValue}
            onChange={setTextFieldValue}
            onKeyDown={handleKeyDown}
            helperText={!isValid && t('LandingPage.BadEmail')}
            error={!isValid}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Welcome
