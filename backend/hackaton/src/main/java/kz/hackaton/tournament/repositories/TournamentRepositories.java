package kz.hackaton.tournament.repositories;

import kz.hackaton.tournament.entities.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentRepositories extends JpaRepository<Tournament, Long> {


}
