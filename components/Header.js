import { ConnectButton } from "./ConnectButton";

export function Header() {

  return (
    <div style={headerFlex}>
      <div style={headerText}>
        OrbiSlack
      </div>
      <ConnectButton />
    </div>
  )
}

const headerFlex = {
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: '10px 0',
}

const headerText = {
  color: '#2b77ff',
  fontSize: '20px',
  fontWeight: 'bold',
  fontStyle: 'italic',
  alignSelf: 'center'
}