package kz.hackaton.tournament.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "leaderboard")
@Getter
@Setter
public class Leaderboard{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "winner")
    private Long winnerId;
    @Column(name = "count")
    private Long count;
}
