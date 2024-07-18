
function auth (){
    const status = useSelector((state) => state.auth.status);
const navigate = useNavigate();
useEffect(() => {
    if (status !== 'logged_in') {
        alert('Please login first');
        navigate('/login');
    }
}, [status, navigate]);
}


export default auth