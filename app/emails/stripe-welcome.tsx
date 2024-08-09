import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'

type Props = {
  validateLink: string
}

export const StripeWelcomeEmail = ({ validateLink }: Props) => (
  <Html>
    <Head />
    <Preview>You're now ready to make live transactions with Stripe!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src={`https://guiding-picked-slug.ngrok-free.app/static/logotype-houpette.png`}
            width="150"
            height="51"
            alt="Stripe"
          />
          <Hr style={hr} />
          <Text style={paragraph}>
            Merci d'avoir rejoint kipkid, vous êtes maintenant prêt pour nous donner de l'oseil tout
            les mois svp merci.{' '}
          </Text>
          <Text style={paragraph}>
            Vous pouvez maintenant valider votre email en cliquant sur le liens suivant
          </Text>
          <Button style={button} href={validateLink}>
            Valider mon email
          </Button>

          <Hr style={hr} />
          <Text style={footer}>
            Kipkid, 35 boulevard de mon fion, Voisin le bre wesh, 3615 sans ami
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default StripeWelcomeEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const box = {
  padding: '0 48px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
}

const anchor = {
  color: '#556cd6',
}

const button = {
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '10px',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
}
