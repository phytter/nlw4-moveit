import { useContext } from 'react'
import { ChallengeContext } from '../contexts/challengeContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
  const { level } = useContext(ChallengeContext);
  return (
    <div className={styles.container}>
      <img src="https://github.com/phytter.png" alt="Alexandre" />
      <div>
        <strong>
          Alexandre da Silva
        </strong>
        <p>
          <img src="icons/level.svg" alt="" />
          Level {level}
        </p>
      </div>
    </div>
  )
}