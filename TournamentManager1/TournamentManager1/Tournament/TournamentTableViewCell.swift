//
//  TournamentTableViewCell.swift
//  TournamentManager1
//
//  Created by Aida Moldaly on 23.06.2022.
//

import UIKit


class TournamentTableViewCell: UITableViewCell {


    @IBOutlet var tounamentImageView: UIImageView!
    @IBOutlet var activeLabel: UILabel!
    @IBOutlet var nameLabel: UILabel!
    @IBOutlet var activeContainerView: UIView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
    func configure(with tournament: Tournament) {
        tounamentImageView.image = UIImage(named: "\(String(describing: tournament.image))")
        nameLabel.text = tournament.gameName
        
        if tournament.active == true {
            activeContainerView.backgroundColor = .systemGreen
            activeLabel.text = "Active"
        } else {
            activeContainerView.backgroundColor = .systemRed
            activeLabel.text = "Not active"
        }
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        // Configure the view for the selected state
    }
}
