import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/authen/authenSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [fromData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repassword: ''
    })
    const { name, email, password, repassword } = fromData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.authen)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((previousState) => ({
            ...previousState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== repassword) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1><FaUser /> Register</h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className='from-control'
                            name="name"
                            id="name"
                            value={name}
                            placeholder='Enter your name'
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className='from-control'
                            name="email"
                            id="email"
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className='form-control'
                            name="password"
                            id="password"
                            value={password}
                            placeholder='Enter your password'
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className='form-control'
                            name="repassword"
                            id="repassword"
                            value={repassword}
                            placeholder='Confirm Password'
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-block' >Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register