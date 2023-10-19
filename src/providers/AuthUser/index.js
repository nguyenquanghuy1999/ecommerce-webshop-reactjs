import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth, db } from '../../Firebase';
import { setDoc, getDoc, doc, onSnapshot } from 'firebase/firestore'

import { addCart } from '../../store/actions';
import { useDispatch } from 'react-redux';

export const AuthUserContext = createContext();

function AuthUser({ children }) {

    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState();
    const [name, setName] = useState('');

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    const docSnap = await getDoc(doc(db, 'users', user.email));
                    if (!docSnap.exists()) {
                        await setDoc(doc(db, 'users', user.email), {
                            inforUser: {
                                name: user.displayName || name,
                                email: user.email,
                                photoUrl: user.photoURL,
                            },
                            infoCart: {
                                cartItems: [],
                                cartLength: 0,
                                totalPrice: 0
                            },
                        })
                    } else {
                        setCurrentUser(docSnap.data().inforUser);
                        localStorage.setItem('user', JSON.stringify(docSnap.data().inforUser));
                        dispatch(addCart(docSnap.data().infoCart));
                    }

                    onSnapshot(doc(db, 'users', user.email), (doc) => {
                        setCurrentUser(doc.data().inforUser);
                        dispatch(addCart(doc.data().infoCart));
                    });
                } else {
                    localStorage.removeItem('user');
                    localStorage.removeItem('cart');
                    setCurrentUser(null);
                }
            } catch (error) {
                console.log('error', error);
            }
        })
        return () => unsubcribe();
    }, [name])


    return (
        <AuthUserContext.Provider value={{ currentUser, setName }}>
            {children}
        </AuthUserContext.Provider>
    )

}
export default AuthUser;