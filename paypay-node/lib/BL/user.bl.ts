import { Request } from "express";
import { JwtHandler } from "../utils/jwt/jwt.handler";
import { UserHelper } from "../helper/user.helper";
import { IUserInterface, IUserLogin } from "../interfaces/user.interface";
import { IFunctionalResponse } from "../interfaces/IFunctional.response";
let userInternalResponse: IFunctionalResponse = {
    errors: null,
    data: null,
    status: false,
    msg: ''
};
export class UserBL {

	static createNewUser(req: Request, callback: any) {
        const userData: IUserInterface = {
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            photo: req.body.photo,
            hobby: req.body.hobby,
            password: req.body.password,
            role: req.body.role
        };
        UserHelper.addUser(userData, (response)=> {
            callback(response);
        });
	}

	static updateUserDetails(req: Request, callback: any) {
        const userData: IUserInterface = {
            name: req.body.name,
            gender: req.body.gender,
            // email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            // photo: req.body.photo,
            hobby: req.body.hobby,
            isActive: req.body.isActive,
            role: req.body.role
            // password: req.body.password
        };
        UserHelper.updateUserDetails(req?.body?._id, userData, (response)=> {
            callback(response);
        });
    }
    
    static getUserDetailsByUserNamePassword(req, callback) {
        try {
            const userDetails: IUserLogin = {
                email: req.body.email,
                password: req.body.password
            };
            UserHelper.checkUserLogin(userDetails, (response)=> {
                if (response?.status) {
                    const token = JwtHandler.createJwtToken(response?.data)
                    response.data = token;
                }
                callback(response)
            });   
        } catch (exception) {
            throw exception;
        }
    }

    static getUserDetails(req: Request, callback) {
        const userId = req?.params?.id ? req?.params?.id: null;
        UserHelper.getUserDetails(userId, (userResponse: IFunctionalResponse) => {
            callback(userResponse);
        });
    }

	static deleteUser(req, callback) {
        const userId = req?.params?.id ? req?.params?.id: null;
        if (userId) {
            UserHelper.deleteUser(userId, false ,(userResponse: IFunctionalResponse) => {
                callback(userResponse);
            });
        } else {
            const userResponse: IFunctionalResponse = {
                status : false,
                data: [],
                errors: 'No id passed to delete the user'
            }
            callback(userResponse);
        }
    }

    static toggleUserStatus(req, callback) {
        const userId = req?.params?.id ? req?.params?.id: null;
        const userStatus = req?.params?.isToggle ? req?.params?.isToggle: false;
        if (userId) {
            UserHelper.deleteUser(userId, userStatus ,(userResponse: IFunctionalResponse) => {
                callback(userResponse);
            });
        } else {
            const userResponse: IFunctionalResponse = {
                status : false,
                data: [],
                errors: 'No id passed to delete the user'
            }
            callback(userResponse);
        }
    }
}