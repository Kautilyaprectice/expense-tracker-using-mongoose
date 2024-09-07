const User = require('../modles/user');
const FileUrl = require('../modles/file-url');
const AWS = require('aws-sdk');

exports.getUserLeaderboard = async (req, res, next) => {
    try{
        const userLeaderboardDetails = await User.find({})
            .select('name total')
            .sort({total: -1});
        res.status(200).json(userLeaderboardDetails);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};

exports.downloadExpense = async (req, res, next) => {
    try {
        const expenses = await req.user.getExpenses();
        const stringifiedExpenses = JSON.stringify(expenses);
        const userId = req.user._id;
        const filename = `Expenses${userId}/${new Date().toISOString()}.txt`;
        const fileUrl = await uploadToS3(stringifiedExpenses, filename);
        const fileUrlDoc = new FileUrl({
            userId: userId,
            fileUrl: fileUrl,
            downloadDate: new Date()
        });
        await fileUrlDoc.save();
        res.status(200).json({ fileUrl, success: true });
    } catch (err) {
        console.error('Error downloading expenses:', err);
        res.status(500).json(err);
    }
};

function uploadToS3(data, filename) {
    const bucketName = process.env.BUCKET_NAME;
    const iam_user_key = process.env.IAM_USER_KEY;
    const iam_user_secret = process.env.IAM_USER_SECRET;

    let s3bucket = new AWS.S3({
        accessKeyId: iam_user_key,
        secretAccessKey: iam_user_secret
    });

    var params = {
        Bucket: bucketName,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    };

    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.error('Error uploading to S3:', err);
                reject(err);
            } else {
                console.log('Upload success', s3response);
                resolve(s3response.Location);
            }
        });
    });
};

exports.getDownloadHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const downloadHistory = await FileUrl.find({ userId: userId });
        res.status(200).json(downloadHistory);
    } catch (err) {
        console.error('Error fetching download history:', err);
        res.status(500).json({ message: 'Error fetching download history', error: err });
    }
};