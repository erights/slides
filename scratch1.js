function coveredCall(terms, inviteMaker) {
  const [leftNeeded, rightNeeded, timerP, deadline] = terms;
  const [leftInvite, rightInvite] = escrowExchange({ leftNeeded, rightNeeded }));
  const aEscrowSeatP = inviteMaker.redeem(leftInvite);
  const bEscrowSeatP = inviteMaker.redeem(rightInvite);

  timerP ! delayUntil(deadline).then(_ => bEscrowSeatP ! cancel('expired'));

  const bSeat = harden({
    offer(rightPayment) {
      const sIssuer = rightNeeded.label.issuer;
      return sIssuer ! getExclusive(rightNeeded, rightPayment, 'prePay').then(
        prePayment => (bEscrowSeatP ! offer(prePayment),
                       inviteMaker.make('holder', aEscrowSeatP)));
    },
    getWinnings() { return bEscrowSeatP ! getWinnings(); },
    getRefund() { return bEscrowSeatP ! getRefund(); }
  });
  return inviteMaker.make('writer', bSeat);
}
