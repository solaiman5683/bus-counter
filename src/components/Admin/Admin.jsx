import React from 'react';
import styles from './admin.module.css';
import { Link } from 'react-router-dom';

const Admin = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(e.target.email.value);
    }
	return (
		<div className={styles.container}>
			<div>
				<Link to='/'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5'
						viewBox='0 0 20 20'
						fill='currentColor'>
						<path
							fillRule='evenodd'
							d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
							clipRule='evenodd'
						/>
					</svg>
					Back Home
				</Link>
				<h3
					style={{
						textAlign: 'center',
						margin: '20px 0',
						textTransform: 'uppercase',
					}}>
					Login to Admin Panel
				</h3>
				<form className={styles.form} onSubmit={handleLogin}>
					<div>
						<label htmlFor='email'>Email *</label>
						<input type='email' placeholder='Enter Your Email' name='email' required />
					</div>
					<div>
						<label htmlFor='password'>'Password' *</label>
						<input type='password' placeholder='Enter Your Password' name='password' required />
                    </div>
                    <input type="submit" value='Login' />
				</form>
			</div>
		</div>
	);
};

export default Admin;
