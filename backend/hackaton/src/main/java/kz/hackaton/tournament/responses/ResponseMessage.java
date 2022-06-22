package kz.hackaton.tournament.responses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseMessage {
    private int code;
    private String message;
}
