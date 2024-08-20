import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''

type Props = {
  validateLink: string
}
export const StripeWelcomeEmail = ({ validateLink }: Props) => (
  <Html>
    <Head />
    <Preview>You're now ready to make live transactions with Stripe!</Preview>
    <Body style={main}>
      <Container
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #DEDBD9',

          padding: '44px 48px',
        }}
      >
        <Section style={box}>
          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Img
              src={`${baseUrl}/static/logotype-houpette.png`}
              width="150"
              height="50"
              alt="Kipkid"
            />
          </Container>
          <Hr style={hr} />
          <Heading style={h1}>Confirmation de l’adresse e-mail</Heading>
          <Text style={paragraph}>
            Votre compte kipkid n’est pas encore actif. Cliquez sur le bouton pour valider votre
            compte kipkid, puis retournez à l’application.
          </Text>

          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={button} href={validateLink}>
              Valider mon compte kipkid
            </Button>
          </Container>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default StripeWelcomeEmail

const h1 = {
  color: '#333',
  textAlign: 'center' as const,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '10px 0',
  padding: '0',
}

const main = {
  backgroundColor: '#F7F4F2',

  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boder: '1px solid red',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const box = {}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center' as const,
}

const anchor = {
  color: '#556cd6',
}

const button = {
  backgroundColor: '#D77918',
  borderRadius: '16px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,

  padding: '8px 16px',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
}
