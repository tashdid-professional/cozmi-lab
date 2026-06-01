import Image from 'next/image'
import React from 'react'
import styles from './loading.module.css'

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}>
        <Image src="/images/logo.png" alt="logo" width={120} height={120} />
      </div>
    </div>
  )
}
