// @ts-nocheck
import { getAuth, getRedirectResult } from '@firebase/auth'
import { createContext, useEffect, useState, useContext } from 'react'
import { auth } from '@/firebase/client'

const FirebaseAuthContext = createContext({
    currentUser: undefined,
})

// 認証プロバイダ
const FirebaseAuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined)

    // authはnullの可能性があるので、useEffectの第二引数にauthを指定しておく
    useEffect(() => {
        /**
       * authオブジェクトのログイン情報の初期化はonAuthStateChanged 発火時に行われる
       * onAuthStateChangedが発火する前(authオブジェクトの初期化が完了する前)にcurrentUserを参照してしまうと、ログインしていてもnullになってしまう
       * @see {@link https://firebase.google.com/docs/auth/web/manage-users}<br>
       * そのため、userデータの参照はonAuthStateChanged内で行う
       */
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user)
            }
            getRedirectResult(auth)
        })
        return () => {
            // onAuthStateChangedはfirebase.Unsubscribeを返すので、ComponentがUnmountされるタイミングでUnsubscribe(登録解除)しておく
            unsubscribed()
        }
    }, [auth])
    return (
        <FirebaseAuthContext.Provider value={{ currentUser: currentUser }}>
            {children}
        </FirebaseAuthContext.Provider>
    )
}

export { FirebaseAuthContext, FirebaseAuthProvider }

export const userFirebaseAuthContext = () => useContext(FirebaseAuthContext)