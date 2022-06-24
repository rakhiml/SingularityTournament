//
//  DetailViewController.swift
//  TournamentManager1
//
//  Created by Aida Moldaly on 23.06.2022.
//

import UIKit

class DetailViewController: UIViewController {
    

    @IBOutlet var imageView: UIImageView!
    @IBOutlet var titleLabel: UILabel!
    @IBOutlet var descriptionLabel: UILabel!
    @IBOutlet var joinButton: UIButton!
    @IBOutlet var startButton: UIButton!
    
    private var networkManager = NetworkManagerAF.shared
    
    var tournamentId: Int?
    var gameId: Int?
    
    var touraments: [TournamentDetails] = []
    
    var tournament: TournamentDetails?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setUp()
        if let tournament = tournament {
            imageView.image = UIImage(named: "\(tournament.type).jpeg")
            titleLabel.text = tournament.type
            descriptionLabel.text = tournament.description
            title = tournament.type
            
        }
//        loadTournaments(id: tournamentId!)
    }
    
    func setUp() {
        Utilities.styleFilledButton(joinButton)
        Utilities.styleHollowBorderButton(startButton)
    }
    
    @IBAction func joinButtonTapped(_ sender: UIButton) {
        
    }
    
    @IBAction func startButtonTapped(_ sender: UIButton) {
        
    }
    
    
    
}

extension DetailViewController {
    
    private func loadTournaments(id: Int) {
        networkManager.loadTournamentsMainID(id: id){ [weak self] tournaments in
//            self?.tournament = tournaments
        }
    }
}
