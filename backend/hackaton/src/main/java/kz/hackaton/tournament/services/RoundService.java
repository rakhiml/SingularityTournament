package kz.hackaton.tournament.services;

import kz.hackaton.tournament.entities.Round;
import kz.hackaton.tournament.repositories.RoundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoundService {
    private final RoundRepository roundRepository;


    public void save(Round round) {
        roundRepository.save(round);
    }
}
