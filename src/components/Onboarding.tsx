import { Button } from "./Button"
import { Container } from "./container"
import { Logo } from "./icons/logo"

const Onboarding = () => {
  return (
    <Container>
      <div>
        <h1>Bienvenue sur Dabara</h1>
        <h2>
          Dabara vous donne la possibilité
          de faire plein de trucs machins choses
        </h2>
      </div>

      <div>
        <Logo />
        <input type="text" />
        <div>
          C&apos;est gratuit !
        </div>
        <Button > Créer votre portfolio maintenant </Button>
      </div>

    </Container>
  )
}

export default Onboarding
