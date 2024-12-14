exports.uploadPost = async (req, res) => {
    const { } = req.body; 
    try {
        
        res.status(200).json({ message: "", token: userToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}