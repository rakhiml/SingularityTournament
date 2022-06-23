//
//  NetworkManagerAF.swift
//  TournamentManager1
//
//  Created by Aida Moldaly on 23.06.2022.
//

//import Foundation
//import Alamofire
//
//class NetworkManagerAF {
//    private let API_KEY = "e516e695b99f3043f08979ed2241b3db"
//    
//    static var shared = NetworkManagerAF()
//    
//    private lazy var urlComponents: URLComponents = {
//        var components = URLComponents()
//        components.scheme = "https"
//        components.host = "api.themoviedb.org"
//        components.queryItems = [
//            URLQueryItem(name: "api_key", value: API_KEY)
//        ]
//        return components
//    }()
//    
//    
//    func sendSignUp(completion: @escaping ([PersonSignUp]) -> Void) {
//        var components = urlComponents
//        components.path = "/3/genre/movie/list"
//        
//        guard let requestUrl = components.url else {
//            return
//        }
//        AF.request(requestUrl).responseJSON { response in
//            guard let data = response.data else {
//                print("Error: Did not receive data")
//                return
//            }
//            do {
//                let genresEntity = try JSONDecoder().decode(GenresEntity.self, from: data)
//                DispatchQueue.main.async {
//                    completion(genresEntity.genres)
//                }
//            } catch {
//                DispatchQueue.main.async {
//                    completion([])
//                }
//            }
//        }
//    }
//    
//    private func loadPersonLogin(path: String, completion: @escaping ([PersonLogin]) -> Void) {
//        var components = urlComponents
//        components.path = path
//        
//        guard let requestUrl = components.url else {
//            return
//        }
//        AF.request(requestUrl).responseJSON { response in
//            guard let data = response.data else {
//                    print("Error: Did not receive data")
//                    return
//                }
//                do {
//                    let moviesEntity = try JSONDecoder().decode(MoviesEntity.self, from: data)
//                    DispatchQueue.main.async {
//                        completion(moviesEntity.results)
//                    }
//                } catch {
//                    DispatchQueue.main.async {
//                        completion([])
//                    }
//                }
//            }
//    }
//}
