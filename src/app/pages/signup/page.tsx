"use client"

import Image from "next/image"
import Link from "next/link"
import styles from './../../page.module.scss'
import logoImg from '/public/logo.svg'

export default function Signup() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="Logo"
          className={styles.imageZoom}
        />

        <section className={styles.panel}>
          <h2>Paciente</h2>
          <form>
            <input 
              type="text"
              required
              name="name"
              placeholder="Digite seu nome completo"
              className={styles.input}
            />

            <input 
              type="email"
              required
              name="email"
              placeholder="Digite seu email"
              className={styles.input}
            />

            <button type="submit" className={styles.button}>
              Cadastrar
            </button>
          </form>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça o login
          </Link>
        </section>

        <section className={styles.panel}>
          <h2>Médico</h2>
          <form>
            <input 
              type="text"
              required
              name="name"
              placeholder="Digite seu nome completo"
              className={styles.input}
            />

            <input 
              type="text"
              required
              name="crm"
              placeholder="Digite seu CRM"
              className={styles.input}
            />

            <button type="submit" className={styles.button}>
              Cadastrar
            </button>
          </form>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça o login
          </Link>
        </section>

      </div> 
    </>
  )
}