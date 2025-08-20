

//GET /api/user

export const getUserData = async (req, res)=>{
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.user.recentSearchedCities;
        res.json({sucess: true, role, recentSearchedCities})
    } catch (error) {
        res.json({sucess: false, message: error.message})
    }
}