import crypto from "crypto";

export async function generateToken(email) {
    const token = crypto.randomBytes(32).toString("hex");
    const combined = token + email;
    const combinedToken=crypto.createHash('sha256').update(combined).digest('hex');
    console.log("combinedToken: ",combinedToken);
    
    return combinedToken;
}
